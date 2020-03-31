import { useState, useEffect } from 'react';
import { fetchPage } from '../flickr';

function mergeImages(images1, images2) {
  const ids1 = new Set (images1.map(img => img.id));
  const newImages = images2.filter(img2 => !ids1.has(img2.id));
  return images1.concat(newImages);
}

function useScrollToBottom(onScrollBottom) {
  useEffect(() => {
    const maybeScrolledToBottom = () => {
      const fullHeight = document.documentElement.scrollHeight;
      const hiddenTopHeight = document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;

      const fetchMargin = 100;
      const windowBottom = hiddenTopHeight + windowHeight;
      const isCloseToBottom = (fullHeight - windowBottom) < fetchMargin;

      if (isCloseToBottom) {
        onScrollBottom({ fullHeight, hiddenTopHeigh: hiddenTopHeight, windowHeight});
      }
    };

    window.addEventListener('scroll', maybeScrolledToBottom);
    window.addEventListener('resize', maybeScrolledToBottom);

    return () => {
      window.removeEventListener('scroll', maybeScrolledToBottom)
      window.removeEventListener('resize', maybeScrolledToBottom)
    };
  });
}

function useInfiniteScrollImages() {
  const [images, setImages] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isFetchingImages, setIsFetchingImages] = useState(false);
  const [error, setError] = useState(null);

  const maybeFetchNextImagePage = () => {
    const isLastPage = pagination ? pagination.page === pagination.pages : false;
    if (!isFetchingImages && !isLastPage) {
      setIsFetchingImages(true);
      setError(null);

      const page = pagination ? pagination.page + 1 : 1;
      fetchPage(page)
        .then(({ photos, ...pagination }) => {
          setImages(prevImages => mergeImages(prevImages, photos));
          setPagination(pagination);
          setIsFetchingImages(false);
        })
        .catch(e => {
          setIsFetchingImages(false);
          setError(e.message);
        });
    }
  };

  useEffect(() => {
    maybeFetchNextImagePage();
  }, []);

  useScrollToBottom(maybeFetchNextImagePage);

  return [images, isFetchingImages, error];
}

export default useInfiniteScrollImages;

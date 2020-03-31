import { useState, useEffect } from 'react';
import { fetchPage } from '../flickr';

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
  const [pagination, setPagination] = useState({ page: 1, pages: 0 });
  const [isFetchingImages, setIsFetchingImages] = useState(false);
  const [error, setError] = useState(null);

  const maybeFetchNextImagePage = () => {
    const isLastPage = pagination.page === pagination.pages;
    if (!isFetchingImages && !isLastPage) {
      setIsFetchingImages(true);
      setError(null);

      fetchPage(pagination.page)
        .then(({ photos, ...pagination }) => {
          setImages(images => images.concat(photos));
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

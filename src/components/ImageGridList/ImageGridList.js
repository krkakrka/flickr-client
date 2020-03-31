import React from 'react';
import {
  Image,
  useInfiniteScrollImages
} from '..';  
import styles from './ImageGridList.module.css';

function ImageGridList() {
  const [flickrImages, isFetching, error] = useInfiniteScrollImages();

  return (
    <div className={styles.container}>
      <div className={styles.gridContainer}>
        {flickrImages.map(flickrImage => (
          <Image
            key={flickrImage.id}
            flickrImage={flickrImage}
            className={styles.gridContainer__item}
          />
        ))}
      </div>
      {isFetching ? 'Loading...' : null}
      {error ? error : null}
    </div>
  );
}

export default ImageGridList;

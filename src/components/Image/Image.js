import React from 'react';
import styles from './Image.module.css';

function Image({ flickrImage, className = '' }) {
  const { title, owner, img } = flickrImage;

  return (
    <div className={`${styles.container} ${className}`}>
      <div className={styles.container__details}>
        <div>{title || '-'}</div>
        <hr className={styles.container__divider} />
        <div>{owner || '-'}</div>
        <button className={styles.container__favourite}>Favourite</button>
      </div>
      <img
        className={styles.container__image}
        src={img}
        alt="flickr"
      />
    </div>
  );
}

export default Image;

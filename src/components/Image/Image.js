import React from 'react';
import styles from './Image.module.css';

function Image({ flickrImage, className = '' }) {
  const { title, owner, img } = flickrImage;
  return (
    <div className={`${styles.container} ${className}`}>
      {/* <div>{title}</div>
      <div>{owner}</div> */}
      <img className={styles.image} src={img} alt="flickr" />
    </div>
  );
}

export default Image;

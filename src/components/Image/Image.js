import React from 'react';
import styles from './Image.module.css';

function Image({ flickrImage }) {
  const { title, owner, img } = flickrImage;
  return (
    <div className={styles.image}>
      <div>{title}</div>
      <div>{owner}</div>
      <img src={img} />
    </div>
  );
}

export default Image;

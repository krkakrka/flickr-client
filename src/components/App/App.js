import React, { useState, useEffect } from 'react';
import { Image } from '..';
import { fetchPage } from '../../flickr';
import './App.css';

function App() {
  const [flickrImages, setImages] = useState([]);
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    fetchPage()
      .then(({ photos, ...pagination }) => {
        setImages(photos);
        setPagination(pagination);
      })
      .catch(console.error)
  }, []);

  return (
    <div className="App">
      {flickrImages.map(flickrImage => (
        <Image key={flickrImage.id} flickrImage={flickrImage} />
      ))}
    </div>
  );
}

export default App;

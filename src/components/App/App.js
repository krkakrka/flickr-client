import React from 'react';
import {
  Image,
  useInfiniteScrollImages
} from '..';
import './App.css';

function App() {
  const [flickrImages, isFetching, error] = useInfiniteScrollImages();

  return (
    <div className="App">
      {flickrImages.map(flickrImage => (
        <Image key={flickrImage.id} flickrImage={flickrImage} />
      ))}
      {isFetching ? 'Loading...' : null}
      {error ? error : null}
    </div>
  );
}

export default App;

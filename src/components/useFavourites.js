import { useState } from 'react';

const FAVOURITES = 'favourites';
const initialFavouritesRaw = window.localStorage.getItem(FAVOURITES);
const initialFavourites = initialFavouritesRaw ? JSON.parse(initialFavouritesRaw) : [];

function withoutImage(favourites, image) {
  return favourites.filter(fav => fav.id !== image.id);
}

function useFavourites() {
  const [favourites, setFavourites] = useState(initialFavourites);
  const favouritesIdSet = new Set(favourites.map(fav => fav.id));

  const isFavourite= (image) => favouritesIdSet.has(image.id);

  const toggleFavourite = (image) => {
    const newFavourites = isFavourite(image) ? withoutImage(favourites, image) : [...favourites, image];
    setFavourites(newFavourites);
    window.localStorage.setItem(FAVOURITES, JSON.stringify(newFavourites));
  };

  return [favourites, toggleFavourite, isFavourite];
}

export default useFavourites;

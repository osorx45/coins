import React from 'react';
import { useFavorites } from './FavoritesContext';

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div>
      <h1>Mis Monedas Favoritas</h1>
      <ul>
        {favorites.map((coin) => (
          <li key={coin.id}>{coin.name} ({coin.symbol.toUpperCase()})</li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;


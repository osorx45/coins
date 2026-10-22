import { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

// This hook belongs with its context provider so both use the same context instance.
// eslint-disable-next-line react-refresh/only-export-components
export const useFavorites = () => {
  return useContext(FavoritesContext);
};

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (coin) => {
    setFavorites((prev) => [...prev, coin]);
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((coin) => coin.id !== id));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
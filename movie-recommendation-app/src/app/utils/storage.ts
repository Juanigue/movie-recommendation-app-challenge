// utils/storage.ts
export const addToFavorites = (movieId: number) => {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    if (!favorites.includes(movieId)) {
      favorites.push(movieId);
      localStorage.setItem('favorites', JSON.stringify(favorites));
    }
  };
  
  export const getFavorites = () => {
    return JSON.parse(localStorage.getItem('favorites') || '[]');
  };
  
  export const removeFromFavorites = (movieId: number) => {
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    favorites = favorites.filter((id: number) => id !== movieId);
    localStorage.setItem('favorites', JSON.stringify(favorites));
  };
  
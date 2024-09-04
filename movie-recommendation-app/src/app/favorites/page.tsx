'use client';
import React, { useEffect, useState } from 'react';
import Navbar from '../ui/Navbar';
import tmdbApi from '../lib/apiDB';
import { useRouter } from 'next/navigation';

interface FavoriteMovie {
  id: number;
  title: string;
  poster_path: string;
}

const FavoriteMoviesPage: React.FC = () => {
  const [favorites, setFavorites] = useState<FavoriteMovie[]>([]);
  const [favoritesT, setFavoritesT] = useState<number[]>(() => {
    // Recuperar favoritos del almacenamiento local
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const router = useRouter();

  useEffect(() => {
    const fetchFavorites = async () => {
      if (favoritesT.length > 0) {
        // Realiza una solicitud a la API de TMDb para obtener los detalles de las películas favoritas
        const favoriteMovies = await Promise.all(
          favoritesT.map(async (id: number) => {
            const response = await tmdbApi.get(`/movie/${id}`);
            return response.data;
          })
        );
        setFavorites(favoriteMovies);
      }
    };

    fetchFavorites();
  }, [favoritesT]);

  useEffect(() => {
    // Guardar favoritos en el almacenamiento local cuando cambien
    localStorage.setItem('favorites', JSON.stringify(favoritesT));
  }, [favoritesT]);

  const removeFavorite = (id: number) => {
    setFavoritesT((prevFavorites) => prevFavorites.filter(favorite => favorite !== id));
    setFavorites((prevFavorites) => prevFavorites.filter(favorite => favorite.id !== id));
  };

  const handleClick = (id: number) => {
    router.push(`/movie/${id}`);
  };

  return (
    <div>
      <Navbar onSearch={() => {}} onSelectGenre={() => {}} />
      <div className="text-lg font-semibold m-2 text-white">
        <h1>My Favorites</h1>
      </div>
      {favorites.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-9 gap-10 p-4">
          {favorites.map(({ id, title, poster_path }) => (
            <div
              key={id}
              className="cursor-pointer border border-rose-500 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
              onClick={() => handleClick(id)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w500${poster_path}`}
                alt={`Movie ${title}`}
                className="w-full h-100 object-cover"
              />
              <div className="p-4 mr-4">
                <h2 className="text-lg font-semibold truncate">{title}</h2>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFavorite(id);
                  }}
                  className="bg-blue-500 text-white rounded px-4 py-2 mt-2"
                >
                  Remove from Favorites
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center mt-4">No favorite movies found.</p>
      )}
    </div>
  );
};

export default FavoriteMoviesPage;

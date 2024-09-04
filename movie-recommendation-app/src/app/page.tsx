'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import tmdbApi from './lib/apiDB';
import Navbar from './ui/Navbar';
import './style/globals.css';

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>(() => {
    // Recuperar favoritos del almacenamiento local
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const router = useRouter();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await tmdbApi.get('/movie/popular');
        setMovies(response.data.results);
      } catch (error) {
        setError('Failed to fetch movies');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  useEffect(() => {
    // Guardar favoritos en el almacenamiento local cuando cambien
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await tmdbApi.get(`/search/movie?query=${encodeURIComponent(query)}`);
      setMovies(response.data.results);
    } catch (error) {
      setError('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectGenre = async (genre: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await tmdbApi.get(`/discover/movie?with_genres=${genre}`);
      setMovies(response.data.results);
    } catch (error) {
      setError('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  // To access movie details
  const handleClick = (id: number) => {
    router.push(`/movie/${id}`);
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(id)) {
        // Delete from favorites
        return prevFavorites.filter(favorite => favorite !== id);
      } else {
        // Add to favorites
        return [...prevFavorites, id];
      }
    });
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onSearch={handleSearch} onSelectGenre={handleSelectGenre} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-10 p-20">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className={`cursor-pointer border border-rose-500 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 ${favorites.includes(movie.id) ? 'bg-rose-400' : ''}`}
            onClick={() => handleClick(movie.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-100 object-cover"
            />
            <div className="p-4 mr-4">
              <h2 className="text-lg font-semibold truncate">{movie.title}</h2>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Evita que el clic en el botón propague el evento al div contenedor
                  toggleFavorite(movie.id);
                }}
                className="bg-indigo-500 text-white rounded px-4 py-2 mt-2"
              >
                {favorites.includes(movie.id) ? 'Remove from Favorites' : 'Add to Favorites'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

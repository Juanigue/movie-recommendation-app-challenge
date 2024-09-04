'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import tmdbApi from "../lib/apiDB";

interface SimilarMoviesProps {
  genreIds: number[];
}

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

const SimilarMovies: React.FC<SimilarMoviesProps> = ({ genreIds }) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const router = useRouter();

  useEffect(() => {
    const fetchSimilarMovies = async () => {
      try {
        const genreQuery = genreIds.join(',');
        const response = await tmdbApi.get(`/discover/movie?with_genres=${genreQuery}`);
        setMovies(response.data.results);
      } catch (error) {
        setError('Failed to fetch similar movies');
      } finally {
        setLoading(false);
      }
    };

    fetchSimilarMovies();
  }, [genreIds]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleMovieClick = (id: number) => {
    router.push(`/movie/${id}`);
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(id)) {
        return prevFavorites.filter(favorite => favorite !== id);
      } else {
        return [...prevFavorites, id];
      }
    });
  };

  if (loading) return <p>Loading similar movies...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="m-2">
      <h2 className="text-2xl font-bold text-white text-left">Similar Movies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-10 p-2">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className={`cursor-pointer bg-neutral-800 border border-rose-500 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 ${favorites.includes(movie.id) ? 'bg-rose-400' : ''}`}
            onClick={() => handleMovieClick(movie.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-100 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold truncate text-white">{movie.title}</h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
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

export default SimilarMovies;

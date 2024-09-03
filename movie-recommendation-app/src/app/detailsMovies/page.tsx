'use client';

import React, { useState, useEffect } from 'react';
import Navbar from '../ui/Navbar';
import SimilarMovies from '../similarMovies/page';
import tmdbApi from '../lib/apiDB';

interface MovieDetail {
  title: string;
  release_date: string;
  genres: { name: string; id: number }[];
  overview: string;
  vote_average: number;
  poster_path: string;
  id: number; // Añadido para soportar la funcionalidad de favoritos
}

interface MovieDetailsProps {
  movie: MovieDetail;
}

const MovieDetails: React.FC<MovieDetailsProps> = ({ movie }) => {
  const [query, setQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [view, setView] = useState<'details' | 'search'>('details');
  const [favorites, setFavorites] = useState<number[]>(() => {
    const savedFavorites = localStorage.getItem('favorites');
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  useEffect(() => {
    setView('details');
  }, [movie]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleSearch = async (query: string) => {
    setQuery(query);
    setView('search');
    setLoading(true);
    setError(null);
    try {
      const response = await tmdbApi.get(`/search/movie?query=${encodeURIComponent(query)}`);
      setSearchResults(response.data.results);
    } catch (error) {
      setError('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectGenre = async (genreId: string) => {
    setSelectedGenre(genreId);
    setView('search');
    setLoading(true);
    setError(null);
    try {
      const response = await tmdbApi.get(`/discover/movie?with_genres=${genreId}`);
      setSearchResults(response.data.results);
    } catch (error) {
      setError('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  const handleResetView = () => {
    setView('details');
    setQuery('');
    setSelectedGenre('');
    setSearchResults([]);
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(id)) {
        return prevFavorites.filter((favorite) => favorite !== id);
      } else {
        return [...prevFavorites, id];
      }
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onSearch={handleSearch} onSelectGenre={handleSelectGenre} />
      <div className="flex flex-col items-center justify-center p-4 flex-1 bg-black-100">
        {view === 'details' ? (
          <div className="max-w-4xl w-full bg-rose-500 rounded-lg shadow-md p-6">
            <div className="flex flex-row">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-1/3 h-auto object-cover rounded-lg m-6"
              />
              <div className="flex-1">
                <h1 className="text-3xl font-bold mb-4 text-white">{movie.title}</h1>
                <p className="text-lg font-semibold mb-2 text-white">
                  <strong>Release Date:</strong> {movie.release_date}
                </p>
                <p className="text-lg font-semibold mb-2 text-white">
                  <strong>Genres:</strong> {movie.genres.map((genre) => genre.name).join(', ')}
                </p>
                <p className="text-lg font-semibold mb-2 text-white">
                  <strong>Overview:</strong> {movie.overview}
                </p>
                <p className="text-lg font-semibold text-white">
                  <strong>Rating:</strong> {movie.vote_average}
                </p>
                <button
                  onClick={() => toggleFavorite(movie.id)}
                  className="bg-blue-500 text-white rounded px-4 py-2 mt-2"
                >
                  {favorites.includes(movie.id) ? 'Remove from Favorites' : 'Add to Favorites'}
                </button>
              </div>
            </div>
            <SimilarMovies genreIds={movie.genres.map((genre) => genre.id)} />
          </div>
        ) : (
          <div>
            <button
              onClick={handleResetView}
              className="bg-rose-500 text-white rounded pt-2 pb-2 pr-5 pl-5 m-2"
            >
              Back to Movie Details
            </button>
            <h2 className="text-2xl font-bold mb-2 text-white">Search Results</h2>
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-4">
                {searchResults.map((movie) => (
                  <div key={movie.id} className="cursor-pointer" onClick={() => handleSearch(movie.id)}>
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="w-full h-auto object-cover rounded-lg"
                    />
                    <p className="text-center font-semibold text-white">{movie.title}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;

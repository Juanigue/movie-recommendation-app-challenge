'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import tmdbApi from '../../lib/tmdbApi';
import SearchBar from './components/SearchBar';
import SelectGenre from './components/SelectGenre';
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

  const handleClick = (id: number) => {
    router.push(`/movie/${id}`);
  };

  if (loading) return <p className="text-center mt-4">Loading...</p>;
  if (error) return <p className="text-center mt-4 text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Películas Destacadas</h1>
      <SearchBar onSearch={handleSearch} />
      <SelectGenre onSelect={handleSelectGenre} />
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="cursor-pointer border rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
            onClick={() => handleClick(movie.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-100 object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold truncate">{movie.title}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;

'use client';
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import tmdbApi from "../../../lib/tmdbApi";

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

  if (loading) return <p>Loading similar movies...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const handleMovieClick = (id: number) => {
    router.push(`/movie/${id}`);
  };

  return (
    <div className="m-6 w-full ">
      <h2 className="text-2xl font-bold text-white text-center">Similar Movies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-10 p-20">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="cursor-pointer bg-neutral-800 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105"
            onClick={() => handleMovieClick(movie.id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-100 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold truncate text-white">{movie.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimilarMovies;

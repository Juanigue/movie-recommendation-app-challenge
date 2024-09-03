'use client';
import React from "react";
import { useRouter } from "next/navigation";
import tmdbApi from "../../../../lib/tmdbApi";

interface MovieDetail {
  title: string;
  release_date: string;
  genres: { name: string }[];
  overview: string;
  vote_average: number;
  poster_path: string;
}

const MovieDetails: React.FC<{ params: { id: string } }> = async ({
  params,
}) => {
  const { id } = params;

  try {
    const response = await tmdbApi.get(`/movie/${id}`);
    const movie: MovieDetail = response.data;
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-100">
        <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold mb-4 text-center">{movie.title}</h1>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="w-full h-100 object-cover rounded-lg mb-4"
          />
          <p className="text-lg font-semibold mb-2">
            <strong>Release Date:</strong> {movie.release_date}
          </p>
          <p className="text-lg font-semibold mb-2">
            <strong>Genres:</strong>{" "}
            {movie.genres.map((genre) => genre.name).join(", ")}
          </p>
          <p className="text-lg font-semibold mb-2">
            <strong>Overview:</strong> {movie.overview}
          </p>
          <p className="text-lg font-semibold">
            <strong>Rating:</strong> {movie.vote_average}
          </p>
        </div>
      </div>
    );
  } catch (error) {
    return <p>Failed to fetch movie details.</p>;
  }
};

export default MovieDetails;

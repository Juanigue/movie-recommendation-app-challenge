import React from "react";
import tmdbApi from "../../../../lib/tmdbApi";
import Navbar from "../../components/Navbar";
import SimilarMovies from "../../components/SimilarMovies";

interface MovieDetail {
  title: string;
  release_date: string;
  genres: { name: string; id: number }[];
  overview: string;
  vote_average: number;
  poster_path: string;
}

const MovieDetails: React.FC<{ params: { id: string } }> = async ({ params }) => {
  const { id } = params;

  const response = await tmdbApi.get(`/movie/${id}`);
  const movie: MovieDetail = response.data;

  return (
    <div className="flex flex-col min-h-screen ml-4 mr-4">
      <Navbar />
      <div className="flex flex-col items-center justify-center p-4 flex-1 bg-gray-100">
        <div className="max-w-4xl w-full bg-black text-lg rounded-lg shadow-md p-6">
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
                <strong>Genres:</strong> {movie.genres.map((genre) => genre.name).join(", ")}
              </p>
              <p className="text-lg font-semibold mb-2 text-white">
                <strong>Overview:</strong> {movie.overview}
              </p>
              <p className="text-lg font-semibold text-white">
                <strong>Rating:</strong> {movie.vote_average}
              </p>
            </div>
          </div>
        </div>
        <SimilarMovies genreIds={movie.genres.map(genre => genre.id)} />
      </div>
    </div>
  );
};

export default MovieDetails;

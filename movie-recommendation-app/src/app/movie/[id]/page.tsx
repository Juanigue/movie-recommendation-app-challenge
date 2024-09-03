//Server Side Component
import tmdbApi from "../../../../lib/tmdbApi";
import MovieDetails from "../../components/MovieDetails";

interface MovieDetail {
  title: string;
  release_date: string;
  genres: { name: string; id: number }[];
  overview: string;
  vote_average: number;
  poster_path: string;
}

const MoviePage = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  // Fetch data from the API
  const response = await tmdbApi.get(`/movie/${id}`);
  const movie: MovieDetail = response.data;

  // Ensure data is fully loaded before passing it to the Client Component
  return <MovieDetails movie={movie} />;
};

export default MoviePage;

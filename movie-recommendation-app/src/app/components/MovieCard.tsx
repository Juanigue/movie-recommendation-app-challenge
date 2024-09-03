interface MovieCardProps {
    title: string;
    releaseDate: string;
    overview: string;
  }
  
  const MovieCard: React.FC<MovieCardProps> = ({ title, releaseDate, overview }) => (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-gray-700 text-base">{releaseDate}</p>
        <p className="text-gray-700 text-base">{overview}</p>
      </div>
    </div>
  );
  
  export default MovieCard;
  
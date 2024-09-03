import React, { useState, useEffect } from 'react';
import tmdbApi from '../../../lib/tmdbApi';

interface SelectGenreProps {
  onSelect: (genre: string) => void;
}

const SelectGenre: React.FC<SelectGenreProps> = ({ onSelect }) => {
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await tmdbApi.get('/genre/movie/list');
        setGenres(response.data.genres);
      } catch (error) {
        console.error('Failed to fetch genres:', error);
      }
    };

    fetchGenres();
  }, []);

  const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const genreId = event.target.value;
    setSelectedGenre(genreId);
    onSelect(genreId);
  };

  return (
    <div className="mb-6">
      <select
        value={selectedGenre}
        onChange={handleSelect}
        className="border border-gray-400 rounded p-3 w-100 mb-2 text-lg text-gray-900 bg-white"
      >
        <option value="">Todos los Generos</option>
        {genres.map((genre) => (
          <option key={genre.id} value={genre.id}>
            {genre.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectGenre;

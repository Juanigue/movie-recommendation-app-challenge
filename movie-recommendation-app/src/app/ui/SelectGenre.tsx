import React, { useState, useEffect } from 'react';
import tmdbApi from '../lib/apiDB';

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
    <div>
      <select
        value={selectedGenre}
        onChange={handleSelect}
        className="rounded p-2 m-2 w-100 text-lg text-gray-900 bg-white"
      >
        <option value="">All Genres</option>
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
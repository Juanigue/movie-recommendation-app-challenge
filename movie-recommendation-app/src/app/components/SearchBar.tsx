import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="mb-6">
      <input
        type="text"
        placeholder="Buscar peliculas..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border border-gray-400 rounded p-2 w-full mb-2 text-lg text-gray-900 bg-white"
      />
      <button
        onClick={handleSearch}
        className="bg-blue-500 text-white rounded p-2 w-100"
      >
        Buscar
      </button>
    </div>
  );
};

export default SearchBar;

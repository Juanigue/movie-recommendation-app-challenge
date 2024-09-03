import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="rounded p-2 m-2 w-100 text-lg text-gray-900 bg-white"
      />
      <button
        onClick={handleSearch}
        className="bg-rose-500 text-white rounded pt-2 pb-2 pr-5 pl-5 m-2"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;

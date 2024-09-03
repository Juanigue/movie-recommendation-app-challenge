'use client';
import React, { useState } from "react";
import Link from "next/link";
import SearchBar from "./SearchBar";
import SelectGenre from "./SelectGenre";

interface NavbarProps {
  onSearch: (query: string) => void;
  onSelectGenre: (genre: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, onSelectGenre }) => {
  const [query, setQuery] = useState("");
  const [selectedGenre, setSelectedGenre] = useState<string>("");

  const handleSearchChange = (newQuery: string) => {
    setQuery(newQuery);
    onSearch(newQuery);
  };

  const handleGenreChange = (genre: string) => {
    setSelectedGenre(genre);
    onSelectGenre(genre);
  };

  return (
    <nav className="bg-gray-800 p-4 mt-4 mb-4 flex items-center justify-between">
      <Link href="/" className="text-white text-2xl font-bold">
        Movie Recommendation App
      </Link>  
      <div className="flex items-center">
        <SelectGenre onSelect={handleGenreChange} />
        <SearchBar onSearch={handleSearchChange} />
      </div>
    </nav>
  );
};

export default Navbar;

'use client';
import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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

  const handleReset = () => {
    setQuery("");
    setSelectedGenre("");
    onSearch("");
    onSelectGenre("");
  };

  return (
    <nav className="bg-neutral-800 p-5 flex justify-between">
      <Link href="/" onClick={handleReset}>
        <Image
          src="/assets/logo2.png"
          alt="Movie Recommendation App Logo"
          width={450}
          height={100}
          quality={100}
        />
      </Link>
      <div className="flex items-center">
        <SelectGenre onSelect={handleGenreChange} />
        <SearchBar onSearch={handleSearchChange} />
      </div>
    </nav>
  );
};

export default Navbar;

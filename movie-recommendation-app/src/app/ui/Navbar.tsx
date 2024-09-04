"use client";
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
    <nav className="bg-neutral-800 p-5 flex justify-between items-center">
      <Link href="/" onClick={handleReset}>
        <Image
          src="/assets/logo4.png"
          alt="Movie Recommendation App Logo"
          width={300}
          height={100}
          quality={100}
        />
      </Link>
      <div className="flex-1 flex justify-center items-center space-x-4">
        <SelectGenre onSelect={handleGenreChange} />
        <SearchBar onSearch={handleSearchChange} />
      </div>
      <div className="flex items-center space-x-4">
        <Link
          href="/favorites"
          className="bg-rose-500 text-white px-4 py-2 rounded hover:bg-rose-600"
        >
          My Favorites
        </Link>
        <Link
          href="/login"
          className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600"
        >
          Login
        </Link>
        <Link
          href="/signin"
          className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600"
        >
          Sign In
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;

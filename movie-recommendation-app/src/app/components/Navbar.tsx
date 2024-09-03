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

  return (
<nav className="bg-neutral-800 p-10 flex justify-between">
  <Link href="/" className="">
    <Image
      src="/assets/logo2.png"
      alt="Movie Recommendation App Logo"
      width={500}
      height={500}
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

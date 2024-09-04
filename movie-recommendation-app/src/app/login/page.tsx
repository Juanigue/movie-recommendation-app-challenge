'use client';
import React from 'react';
import Navbar from '../ui/Navbar';

interface LoginProps {
  onSearch: (query: string) => void;
  onSelectGenre: (genre: string) => void;
}

const Login: React.FC<LoginProps> = ({ onSearch, onSelectGenre }) => {
  return (
    <>
      <Navbar onSearch={onSearch} onSelectGenre={onSelectGenre} />
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-black">Login</h2>
          <form>
            <div className="mb-4">
              <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-rose-500"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;

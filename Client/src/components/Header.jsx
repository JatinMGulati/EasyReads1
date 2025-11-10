// src/components/Header.jsx
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import logo from '/home/jatingulati/Public/RVU/LibraGraph/ChatGPT Image Nov 9, 2025, 09_25_48 PM.png';

const Header = () => {
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="w-full bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-100 shadow">
      <div className="max-w-screen-xl mx-auto flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-4">
          <img src={logo} alt="EasyReads Logo" className="w-12 h-12 rounded-md" />
          <span className="text-2xl font-semibold tracking-wide">EasyReads</span>
        </div>

        <nav className="hidden md:flex gap-8 text-lg font-medium">
          <Link to="/" className="hover:text-blue-300 transition">Home</Link>
          <Link to="/books" className="hover:text-blue-300 transition">Books</Link>
          <Link to="/digital-books" className="hover:text-blue-300 transition">Digital Books</Link>
        </nav>

        <div className="flex gap-4 items-center">
          {isAuthenticated() ? (
            <div className="flex items-center gap-4">
              <span className="text-gray-300">Welcome, {user?.username}</span>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 rounded text-white hover:bg-red-500 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <Link to="/login">
              <button className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-500 transition">
                Login
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile navbar for Books and Digital Books */}
      <div className="md:hidden flex justify-around items-center bg-gray-800 py-2 text-sm font-medium">
        <Link to="/books" className="hover:text-blue-300">Books</Link>
        <Link to="/digital-books" className="hover:text-blue-300">Digital Books</Link>
      </div>
    </header>
  );
};

export default Header;

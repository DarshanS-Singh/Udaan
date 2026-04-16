import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const Navbar = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-900 text-gray-300 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
        
        {/* Left: Nav Links */}
        <div className="flex items-center space-x-1">
          <Link to="/" className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition">
            Home
          </Link>
          <Link to="/add-book" className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition">
            Add Book
          </Link>
          <Link to="/issue-book" className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition">
            Issue Book
          </Link>
          <Link to="/members" className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition">
            Members
          </Link>
          <Link to="/analysis" className="px-3 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition">
            Dashboard
          </Link>
        </div>

        {/* Center: Title */}
        <div className="absolute left-1/2 transform -translate-x-1/2">
          <Link to="/" className="text-2xl font-serif text-white hover:text-gray-200 transition">
            Udaan Library
          </Link>
        </div>

        {/* Right: Search + Login */}
        <div className="flex items-center space-x-3">
          {isSearchActive ? (
            <div className="relative">
              <input
                type="text"
                autoFocus
                onBlur={() => setIsSearchActive(false)}
                className="w-56 px-4 py-2 bg-gray-800 text-gray-300 placeholder-gray-500 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-gray-600 transition"
                placeholder="Search books..."
              />
            </div>
          ) : (
            <button
              onClick={() => setIsSearchActive(true)}
              className="p-2 rounded-lg hover:bg-gray-800 transition"
              title="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          )}

          <Link
            to="/login"
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

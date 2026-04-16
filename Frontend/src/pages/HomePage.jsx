import React from 'react';
import { Link } from 'react-router-dom';
import booksByGenre from "../data.json";

const HomePage = () => {
  return (
    <div className="w-full min-h-screen bg-gray-900 text-gray-300 p-6">
      {Object.keys(booksByGenre).map((genre) => (
        <div key={genre} className="mb-8">
          <h2 className="text-3xl font-serif mb-4">{genre}</h2>
          <div className="w-full flex overflow-x-auto space-x-4 pb-4">
            {booksByGenre[genre].map((book) => (
              <Link
                to={`/book/${book.id}`}
                key={book.id}
                className="flex-none w-48 bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700 hover:bg-gray-700 hover:scale-105 transition-all duration-300 cursor-pointer flex flex-col"
              >
                <img
                  src={book.imageUrl}
                  alt={`${book.title} cover`}
                  className="w-full h-64 object-cover mb-4 rounded"
                />
                <h3 className="text-xl font-semibold font-serif mb-1">{book.title}</h3>
                <p className="text-sm italic text-gray-400 mb-2">by {book.author}</p>
                <p className="mt-auto text-sm text-gray-400 line-clamp-3">{book.description}</p>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default HomePage;

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import booksData from '../data.json';

const BookDetails = () => {
  const { id } = useParams();
  
  // Find the book across all genres
  let book = null;
  let bookGenre = "";
  for (const [genre, books] of Object.entries(booksData)) {
    const found = books.find(b => b.id === parseInt(id));
    if (found) {
      book = found;
      bookGenre = genre;
      break;
    }
  }

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-gray-300">
        <h2 className="text-3xl font-serif">Book Not Found</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-300 p-8 flex justify-center">
      <div className="max-w-4xl w-full bg-gray-800 rounded-2xl shadow-2xl p-8 flex flex-col md:flex-row gap-8">
        <div className="w-full md:w-1/3 flex-shrink-0">
          <img 
            src={book.imageUrl} 
            alt={book.title} 
            className="w-full h-auto rounded-xl shadow-lg border border-gray-700"
          />
        </div>
        <div className="flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-4xl font-serif font-bold text-white mb-2">{book.title}</h1>
              <p className="text-xl text-gray-400 italic">by {book.author}</p>
            </div>
            <span className="px-3 py-1 bg-blue-900/50 text-blue-300 border border-blue-700 rounded-full text-sm font-semibold">
              {bookGenre}
            </span>
          </div>

          <div className="mt-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-200 mb-2 border-b border-gray-700 pb-2">Synopsis</h3>
            <p className="text-lg text-gray-400 leading-relaxed">
              {book.description}
            </p>
          </div>

          <div className="mt-auto flex gap-4">
            <Link 
              to="/issue-book"
              className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-6 rounded-lg shadow-lg shadow-emerald-900/50 transition-all text-center"
            >
              Issue This Book
            </Link>
            <Link 
              to="/"
              className="flex-1 bg-gray-700 hover:bg-gray-600 text-gray-200 font-bold py-3 px-6 rounded-lg transition-all text-center border border-gray-600"
            >
              Back to Library
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;

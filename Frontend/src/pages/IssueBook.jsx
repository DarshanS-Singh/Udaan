import React, { useState } from 'react';
import booksData from '../data.json';

const IssueBook = () => {
  // Flatten all books for the dropdown
  const allBooks = Object.values(booksData).flat();
  const availableBooks = allBooks.filter(b => !b.issued);

  const [formData, setFormData] = useState({
    bookId: availableBooks.length > 0 ? availableBooks[0].id : '',
    memberName: '',
    memberEmail: '',
    returnDate: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, post to backend
    alert(`Book successfully issued to ${formData.memberName}!`);
    setFormData({ bookId: availableBooks.length > 0 ? availableBooks[0].id : '', memberName: '', memberEmail: '', returnDate: '' });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6 text-gray-300">
      <div className="max-w-2xl w-full bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-700">
        <h2 className="text-3xl font-serif font-bold text-white mb-6">Issue a Book</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-400">Select Book</label>
            <select
              required
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-300"
              value={formData.bookId}
              onChange={(e) => setFormData({...formData, bookId: e.target.value})}
            >
              {availableBooks.length > 0 ? (
                availableBooks.map(b => (
                  <option key={b.id} value={b.id}>{b.title} by {b.author}</option>
                ))
              ) : (
                <option value="">No books available to issue</option>
              )}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-400">Member Full Name</label>
            <input 
              required
              type="text" 
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              placeholder="e.g. Jane Smith"
              value={formData.memberName}
              onChange={(e) => setFormData({...formData, memberName: e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-400">Member Email</label>
            <input 
              required
              type="email" 
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              placeholder="jane@example.com"
              value={formData.memberEmail}
              onChange={(e) => setFormData({...formData, memberEmail: e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-400">Target Return Date</label>
            <input 
              required
              type="date" 
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-300" 
              value={formData.returnDate}
              onChange={(e) => setFormData({...formData, returnDate: e.target.value})}
            />
          </div>

          <button 
            type="submit" 
            disabled={availableBooks.length === 0}
            className="w-full mt-4 py-3 bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-600 text-white font-bold rounded-lg shadow-lg shadow-emerald-900/50 transition duration-300"
          >
            {availableBooks.length === 0 ? "No Books Available" : "Issue Book"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default IssueBook;

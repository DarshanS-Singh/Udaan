import React, { useState } from 'react';

const AddBook = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: 'ClassicLiterature',
    description: '',
    imageUrl: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Normally this is where you'd axios.post('/books', formData)
    alert("Book added successfully! (UI Only for Demo)");
    setFormData({ title: '', author: '', genre: 'ClassicLiterature', description: '', imageUrl: '' });
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6 text-gray-300">
      <div className="max-w-2xl w-full bg-gray-800 p-8 rounded-xl shadow-xl border border-gray-700">
        <h2 className="text-3xl font-serif font-bold text-white mb-6">Add a New Book</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-400">Book Title</label>
            <input 
              required
              type="text" 
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              placeholder="e.g. The Great Gatsby"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-400">Author</label>
            <input 
              required
              type="text" 
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              placeholder="e.g. F. Scott Fitzgerald"
              value={formData.author}
              onChange={(e) => setFormData({...formData, author: e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-400">Genre</label>
            <select
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-300"
              value={formData.genre}
              onChange={(e) => setFormData({...formData, genre: e.target.value})}
            >
              <option value="Existentialism">Existentialism</option>
              <option value="Absurdism">Absurdism</option>
              <option value="ClassicLiterature">Classic Literature</option>
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-400">Cover Image URL</label>
            <input 
              required
              type="url" 
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              placeholder="https://example.com/cover.jpg"
              value={formData.imageUrl}
              onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="font-semibold text-gray-400">Description</label>
            <textarea 
              required
              rows="4" 
              className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" 
              placeholder="Brief synopsis..."
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="w-full mt-4 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg shadow-lg shadow-blue-900/50 transition duration-300"
          >
            Save Book to Library
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddBook;

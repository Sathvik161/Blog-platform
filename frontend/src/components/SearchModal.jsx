import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api'; // Import your API instance

export const SearchModal = ({ onClose }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await api.get(`/search?query=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error searching posts:', error);
    }
  };

  const handleResultClick = (postId) => {
    navigate(`/posts/${postId}`); // Navigate to the PostView page
    onClose(); // Close the modal after navigating
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold">Search Posts</h2>
          <button onClick={onClose} className="text-red-500 text-xl">&times;</button> {/* Close button */}
        </div>
        <form onSubmit={handleSearch} className="mt-4">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by title, content, or tags"
            className="border border-gray-300 rounded-lg p-2 w-full"
          />
          <button
            type="submit"
            className="mt-2 w-full bg-blue-600 text-white rounded-lg p-2 hover:bg-blue-700"
          >
            Search
          </button>
        </form>
        
        {/* Display search results */}
        <div className="mt-4">
          {results.length > 0 ? (
            results.map((post) => (
              <div key={post._id} className="border-b py-2">
                <button 
                  onClick={() => handleResultClick(post._id)} 
                  className="text-blue-600 hover:underline"
                >
                  {post.title}
                </button>
                <p className="text-gray-600">{post.content.substring(0, 100)}...</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No results found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

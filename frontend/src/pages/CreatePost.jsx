// src/pages/CreatePost.jsx
import React, { useState } from 'react';
import api from '../api/api'; // Import your API instance
import { useNavigate } from 'react-router-dom';

export const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await api.post('/posts', { title, content, tags: tags.split(',') }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/posts'); // Redirect to posts list after creating
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h2 className="text-5xl font-extrabold text-gray-800 mb-6">Create Post</h2>
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-96">
        <div className="mb-6">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-2 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            className="mt-2 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700">Tags (comma-separated)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="mt-2 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>
        <button
          type="submit"
          className="w-full px-4 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-200"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

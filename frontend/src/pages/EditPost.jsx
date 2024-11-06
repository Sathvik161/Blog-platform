import React, { useEffect, useState } from 'react';
import api from '../api/api';
import { useParams, useNavigate } from 'react-router-dom';

export const EditPost = () => {
  const { id } = useParams(); // Get post ID from URL
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get(`/posts/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTitle(response.data.title);
        setContent(response.data.content);
        setTags(response.data.tags.join(', '));
      } catch (error) {
        console.error('Error fetching post:', error);
      }
    };

    fetchPost();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await api.put(`/posts/${id}`, { title, content, tags: tags.split(',') }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate(`/posts/${id}`); // Redirect to post view after updating
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h2 className="text-5xl font-extrabold text-gray-800 mb-6">Edit Post</h2>
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
          <label className="block text-gray-700">Tags (comma separated)</label>
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
          Save Changes
        </button>
      </form>
    </div>
  );
};

import React, { useEffect, useState } from 'react';
import api from '../api/api';

export const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    // Fetch user profile when component loads
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(response.data);
        setUsername(response.data.username);
        setEmail(response.data.email);
        setBio(response.data.bio || 'empty'); // Display "empty" if bio is not set
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await api.put(
        '/profile',
        { username, email, bio },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditMode(false);
      setUser({ ...user, username, email, bio });
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h2 className="text-5xl font-extrabold text-gray-800 mb-6">Profile</h2>

      {!editMode ? (
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <p className="mb-4">
            <strong>Username:</strong> {user.username}
          </p>
          <p className="mb-4">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="mb-4">
            <strong>Bio:</strong> {user.bio || 'empty'}
          </p>
          <button
            onClick={handleEditToggle}
            className="w-full px-4 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
          >
            Edit Profile
          </button>
        </div>
      ) : (
        <form onSubmit={handleSave} className="bg-white p-8 rounded-lg shadow-md w-96">
          <div className="mb-6">
            <label className="block text-gray-700">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="mt-2 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-2 block w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700">Bio</label>
            <textarea
              value={bio === 'empty' ? '' : bio}
              onChange={(e) => setBio(e.target.value)}
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
      )}
    </div>
  );
};

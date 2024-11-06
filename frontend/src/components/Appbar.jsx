import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/api'; // Axios instance for API calls
import { SearchModal } from './SearchModal'; // Import your SearchModal component

export const Appbar = () => {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false); // State for search modal visibility
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user profile when component loads
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Get token from local storage
        if (token) {
          const response = await api.get('/profile', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data); // Set user data
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, []);

  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen); // Toggle dropdown visibility
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // Clear the token
    navigate('/signin'); // Redirect to the login page
  };

  const handleViewProfile = () => {
    navigate('/profile'); // Navigate to the profile page
  };

  const toggleSearchModal = () => {
    setIsSearchModalOpen(!isSearchModalOpen); // Toggle search modal visibility
  };

  return (
    <div className="shadow h-14 flex justify-between items-center">
      <div className="flex flex-col justify-center h-full ml-4">
        My Blog App
      </div>
      <div className="flex items-center mr-4"> {/* Added items-center for vertical alignment */}
        <button onClick={toggleSearchModal} className="mr-4">
          {/* Search Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-600 hover:text-gray-800 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 4a6 6 0 106 6 6 6 0 00-6-6zm0 12a6 6 0 110-12 6 6 0 010 12z"
            />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16.5 16.5l3.75 3.75" />
          </svg>
        </button>
        
        {user && (
          <>
            <div className="flex flex-col justify-center h-full mr-4">
              Hello, {user.username}
            </div>
            <div
              className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2 cursor-pointer"
              onClick={handleProfileClick} // Handle click to toggle dropdown
            >
              <div className="flex flex-col justify-center h-full text-xl">
                {user.username.charAt(0).toUpperCase()} {/* Show first letter */}
              </div>
            </div>
            {/* Dropdown menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10">
                <button
                  onClick={handleViewProfile}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  View Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Search Modal */}
      {isSearchModalOpen && <SearchModal onClose={toggleSearchModal} />} {/* Include the search modal here */}
    </div>
  );
};



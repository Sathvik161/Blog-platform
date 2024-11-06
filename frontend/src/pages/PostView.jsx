import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/api';
import { Comments } from '../components/Comments';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa'; // Importing thumbs up and down icons

export const PostView = () => {
  const { id } = useParams(); // Get the post id from the URL
  const [post, setPost] = useState(null);
  const [isAuthor, setIsAuthor] = useState(false); // Track if the user is the author
  const [showSidebar, setShowSidebar] = useState(false); // Sidebar visibility state
  const [likes, setLikes] = useState(0); // State for likes count
  const [dislikes, setDislikes] = useState(0); // State for dislikes count
  const [hasLiked, setHasLiked] = useState(false); // Track if the user has liked the post
  const [hasDisliked, setHasDisliked] = useState(false); // Track if the user has disliked the post
  const [error, setError] = useState(null); // Error state for notifications
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await api.get(`/posts/${id}`);
        setPost(response.data);
        setLikes(response.data.likes || 0); // Initialize likes count
        setDislikes(response.data.dislikes || 0); // Initialize dislikes count

        // Check if the current user is the author
        const currentUserId = localStorage.getItem('userId');
        if (currentUserId && response.data.author._id === currentUserId) {
          setIsAuthor(true); // Set author state
        }

        // Check if the current user has liked or disliked the post
        const userId = localStorage.getItem('userId');
        if (userId) {
          setHasLiked(response.data.likedBy.includes(userId));
          setHasDisliked(response.data.dislikedBy.includes(userId));
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        setError('Error fetching post data. Please try again later.');
      }
    };

    fetchPost();
  }, [id]);

  const handleLike = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.post(`/posts/${id}/like`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setLikes(response.data.likes); // Update likes count after liking the post
      setHasLiked(!hasLiked); // Toggle hasLiked state

      // Reset dislike if the user liked the post
      if (hasDisliked) {
        setDislikes(response.data.dislikes); // Update dislikes count
        setHasDisliked(false);
      }
      setError(null); // Clear previous errors
    } catch (error) {
      console.error('Error liking post:', error);
      setError('Error liking post. Please try again.');
    }
  };

  const handleDislike = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.post(`/posts/${id}/dislike`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setDislikes(response.data.dislikes); // Update dislikes count after disliking the post
      setHasDisliked(!hasDisliked); // Toggle hasDisliked state

      // Reset like if the user disliked the post
      if (hasLiked) {
        setLikes(response.data.likes); // Update likes count
        setHasLiked(false);
      }
      setError(null); // Clear previous errors
    } catch (error) {
      console.error('Error disliking post:', error);
      setError('Error disliking post. Please try again.');
    }
  };

  if (!post) return <div>Loading...</div>;

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <div className="flex justify-center p-6 bg-gray-50 min-h-screen">
      {/* Main post and comments section */}
      <div className="flex flex-col w-full lg:w-3/4 bg-white p-6 rounded-lg shadow-md relative">
        <h2 className="text-4xl font-bold mb-4">{post.title}</h2>
        <p className="text-gray-600 mb-6">By {post.author.username}</p>
        <p className="text-lg mb-8">{post.content}</p>
        <p className="text-gray-500 mb-8">Tags: {post.tags.join(', ')}</p>

        {/* Like and Dislike Buttons */}
        <div className="flex items-center mb-4">
          <button 
            onClick={handleLike} 
            className={`flex items-center mr-4 ${hasLiked ? 'text-blue-800' : 'text-blue-600'} hover:text-blue-800`}
          >
            <FaThumbsUp className="mr-2" />
            Like {likes}
          </button>
          <button 
            onClick={handleDislike} 
            className={`flex items-center ${hasDisliked ? 'text-red-800' : 'text-red-600'} hover:text-red-800`}
          >
            <FaThumbsDown className="mr-2" />
            Dislike {dislikes}
          </button>
        </div>

        {/* Error Message */}
        {error && <div className="text-red-500 mb-4">{error}</div>}

        {/* Toggle button for sidebar */}
        {isAuthor && (
          <button
            onClick={toggleSidebar}
            className="absolute top-4 right-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition duration-200"
          >
            Options
          </button>
        )}

        {/* Comments Section */}
        <Comments postId={id} />
      </div>

      {/* Sidebar for Edit/Delete that toggles visibility */}
      {showSidebar && isAuthor && (
        <div className="fixed right-0 top-0 h-full w-64 bg-gray-100 shadow-lg p-6 z-50">
          <h3 className="text-xl font-semibold mb-4">Post Options</h3>
          <button
            onClick={() => navigate(`/edit-post/${id}`)}
            className="mb-4 w-full px-4 py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-200"
          >
            Edit Post
          </button>
          <button
            onClick={async () => {
              try {
                const token = localStorage.getItem('token');
                await api.delete(`/posts/${id}`, {
                  headers: { Authorization: `Bearer ${token}` },
                });
                navigate('/dashboard'); // Redirect to dashboard after deletion
              } catch (error) {
                console.error('Error deleting post:', error);
              }
            }}
            className="w-full px-4 py-2 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition duration-200"
          >
            Delete Post
          </button>
          <button
            onClick={toggleSidebar}
            className="mt-4 w-full px-4 py-2 bg-gray-300 text-gray-700 font-semibold rounded-md hover:bg-gray-400 transition duration-200"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

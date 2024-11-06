import React, { useEffect, useState } from 'react';
import api from '../api/api'; // Import your API instance
import { Link } from 'react-router-dom';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa'; // Import like/dislike icons

export const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [comments, setComments] = useState({});
  const [showComments, setShowComments] = useState({}); // Track which posts' comments are visible

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await api.get('/posts', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleViewComments = async (postId) => {
    if (!showComments[postId]) {
      try {
        const response = await api.get(`/comments/${postId}`);
        setComments((prevComments) => ({
          ...prevComments,
          [postId]: response.data,
        }));
        setShowComments((prevShowComments) => ({
          ...prevShowComments,
          [postId]: true,
        }));
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    } else {
      setShowComments((prevShowComments) => ({
        ...prevShowComments,
        [postId]: false,
      }));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-50">
      <h2 className="text-5xl font-extrabold text-gray-800 mb-6">Posts</h2>

      <div className="w-full max-w-md">
        {posts.length === 0 ? (
          <p>No posts available.</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="bg-white p-4 rounded-lg shadow-md mb-4">
              <Link to={`/posts/${post._id}`} className="text-xl font-bold text-blue-600 hover:underline">
                {post.title}
              </Link>
              <p className="text-gray-700 mt-2">{post.content.substring(0, 100)}...</p>

              <div className="flex items-center mt-2">
                {/* Likes */}
                <div className="flex items-center mr-4 text-blue-600">
                  <FaThumbsUp className="mr-1" /> {post.likes}
                </div>

                {/* Dislikes */}
                <div className="flex items-center text-red-600">
                  <FaThumbsDown className="mr-1" /> {post.dislikes}
                </div>
              </div>

              {/* View Comments Button */}
              <button
                onClick={() => handleViewComments(post._id)}
                className="mt-2 inline-block px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                {showComments[post._id] ? 'Hide Comments' : 'View Comments'}
              </button>

              {/* Display comments if visible */}
              {showComments[post._id] && comments[post._id] && (
                <div className="mt-4">
                  <h3 className="font-semibold">Comments:</h3>
                  {comments[post._id].length === 0 ? (
                    <p>No comments yet.</p>
                  ) : (
                    comments[post._id].map((comment) => (
                      <div key={comment._id} className="bg-gray-100 p-2 rounded-md my-2">
                        <p>
                          <strong>{comment.author.username}:</strong> {comment.content}
                        </p>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Create New Post Link */}
      <Link to="/create-post" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
        Create New Post
      </Link>
    </div>
  );
};

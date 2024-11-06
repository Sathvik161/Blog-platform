import React, { useEffect, useState } from 'react';
import api from '../api/api';

export const Comments = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await api.get(`/comments/${postId}`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await api.post(
        '/comments',
        { post: postId, content },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments([...comments, response.data]);
      setContent(''); // Clear the input after submission
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="mt-8">
      <h3 className="text-3xl font-bold mb-4">Comments</h3>

      {/* Display comments first */}
      <div>
        {comments.length > 0 ? (
          comments.map((comment) => (
            <div key={comment._id} className="border-b border-gray-200 py-2">
              <strong>{comment.author.username}</strong>
              <p>{comment.content}</p>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>

      {/* Comment form comes after the comments */}
      <form onSubmit={handleCommentSubmit} className="flex space-x-4 mt-4">
        <input
          type="text"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add a comment..."
          className="flex-1 border border-gray-300 rounded-md p-2 focus:outline-none focus:ring focus:ring-blue-300"
          required
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

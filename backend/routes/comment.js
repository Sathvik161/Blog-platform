// routes/comment.js
const express = require('express');
const Comment = require('../models/Comment');
const auth = require('../middleware/auth');
const router = express.Router();

// Add a comment
router.post('/', auth, async (req, res) => {
  const { post, content } = req.body;
  try {
    const newComment = new Comment({ post, author: req.user.id, content });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ error: 'Failed to add comment' });
  }
});

// Get comments for a post
router.get('/:postId', async (req, res) => {
  try {
    const comments = await Comment.find({ post: req.params.postId }).populate('author', 'username');
    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch comments' });
  }
});

module.exports = router;

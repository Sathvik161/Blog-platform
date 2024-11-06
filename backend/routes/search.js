// routes/search.js
const express = require('express');
const Post = require('../models/Post');
const router = express.Router();

// Search posts
router.get('/', async (req, res) => {
  const { query } = req.query; // Search query
  try {
    const posts = await Post.find({
      $or: [
        { title: { $regex: query, $options: 'i' } }, // Case-insensitive search
        { content: { $regex: query, $options: 'i' } },
        { tags: { $regex: query, $options: 'i' } },
      ],
    }).populate('author', 'username');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Search failed' });
  }
});

module.exports = router;

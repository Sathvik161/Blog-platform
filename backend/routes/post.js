// routes/post.js
const express = require('express');
const Post = require('../models/Post');
const auth = require('../middleware/auth');
const router = express.Router();

// Create a new post
router.post('/', auth, async (req, res) => {
  const { title, content, tags } = req.body;
  try {
    const newPost = new Post({ title, content, author: req.user.id, tags });
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(400).json({ error: 'Post creation failed' });
  }
});

// Get all posts
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find().populate('author', 'username');
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching posts' });
  }
});

// Get a single post
router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('author', 'username');
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching post' });
  }
});

// Update a post
router.put('/:id', auth, async (req, res) => {
  const { title, content, tags } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    if (!post || post.author.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    if (title) post.title = title;
    if (content) post.content = content;
    if (tags) post.tags = tags;
    await post.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error updating post' });
  }
});

// Delete a post
router.delete('/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post || post.author.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    await post.deleteOne();
    res.json({ message: 'Post deleted' });
 } catch (error) {
   res.status(500).json({ error: 'Error deleting post' });
  }
});



// Like Post Route
router.post('/:id/like', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const userId = req.user.id; // Get the user ID from req.user

        // If the user already liked the post, remove the like
        if (post.likedBy.includes(userId)) {
            post.likedBy.pull(userId);
            post.likes -= 1;
        } else {
            // If the user has disliked the post, remove the dislike first
            if (post.dislikedBy.includes(userId)) {
                post.dislikedBy.pull(userId);
                post.dislikes -= 1;
            }
            // Now add the like
            post.likedBy.push(userId);
            post.likes += 1;
        }

        await post.save();
        res.json({ likes: post.likes, likedBy: post.likedBy, dislikes: post.dislikes, dislikedBy: post.dislikedBy });
    } catch (error) {
        console.error('Error liking post:', error);
        res.status(500).json({ error: 'Could not like post', details: error.message });
    }
});

// Dislike Post Route
router.post('/:id/dislike', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post not found' });
        }

        const userId = req.user.id; // Get the user ID from req.user

        // If the user already disliked the post, remove the dislike
        if (post.dislikedBy.includes(userId)) {
            post.dislikedBy.pull(userId);
            post.dislikes -= 1;
        } else {
            // If the user has liked the post, remove the like first
            if (post.likedBy.includes(userId)) {
                post.likedBy.pull(userId);
                post.likes -= 1;
            }
            // Now add the dislike
            post.dislikedBy.push(userId);
            post.dislikes += 1;
        }

        await post.save();
        res.json({ dislikes: post.dislikes, dislikedBy: post.dislikedBy, likes: post.likes, likedBy: post.likedBy });
    } catch (error) {
        console.error('Error disliking post:', error);
        res.status(500).json({ error: 'Could not dislike post', details: error.message });
    }
});



module.exports = router;

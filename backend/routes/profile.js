// routes/profile.js
const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();

// Get user profile
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Exclude password
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch profile' });
  }
});

// Update user profile
router.put('/', auth, async (req, res) => {
  const { username, email, bio, profilePicture } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (username) user.username = username;
    if (email) user.email = email;
    if (bio) user.bio = bio;
    if (profilePicture) user.profilePicture = profilePicture;
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'Profile update failed' });
  }
});

module.exports = router;

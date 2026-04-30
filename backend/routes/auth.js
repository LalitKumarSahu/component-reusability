const express = require('express');
const jwt     = require('jsonwebtoken');
const User    = require('../models/User');        // from models folder
const { protect } = require('../middleware/auth'); // from middleware folder

const router = express.Router();

// Helper function to generate token
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// ────────────────────────────────────────────────────────────
// POST /api/auth/register   ← Create a new account
// Body: { name, email, password, phone, city }
// ────────────────────────────────────────────────────────────
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, city } = req.body;

    // All required fields must be provided
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

    // Check if the email is already registered
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'This email is already registered.' });
    }

    // Create user (password will be hashed automatically — see model)
    const user = await User.create({ name, email, password, phone, city });

    res.status(201).json({
      message: 'Account created successfully! 🎉',
      token: generateToken(user._id),
      user: {
        id:    user._id,
        name:  user.name,
        email: user.email,
        phone: user.phone,
        city:  user.city,
        role:  user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ────────────────────────────────────────────────────────────
// POST /api/auth/login   ← Login user
// Body: { email, password }
// ────────────────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Both email and password are required.' });
    }

    // Fetch user including password (normally hidden)
    const user = await User.findOne({ email }).select('+password');

    // Check if user exists and password is correct
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    res.json({
      message: 'Login successful! 🌱',
      token: generateToken(user._id),
      user: {
        id:            user._id,
        name:          user.name,
        email:         user.email,
        phone:         user.phone,
        city:          user.city,
        role:          user.role,
        totalPickups:  user.totalPickups,
        totalEarnings: user.totalEarnings,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ────────────────────────────────────────────────────────────
// GET /api/auth/me   ← Get current user's profile (login required)
// ────────────────────────────────────────────────────────────
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ────────────────────────────────────────────────────────────
// PUT /api/auth/update-profile   ← Update user profile
// ────────────────────────────────────────────────────────────
router.put('/update-profile', protect, async (req, res) => {
  try {
    const { name, phone, city } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, phone, city },
      { new: true }   // Return updated user
    );

    res.json({ message: 'Profile updated successfully!', user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
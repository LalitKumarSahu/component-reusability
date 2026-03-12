const express = require('express');
const jwt     = require('jsonwebtoken');
const User    = require('../models/User');        // models folder se
const { protect } = require('../middleware/auth'); // middleware folder se

const router = express.Router();

// Token banane ka helper function
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '7d' });

// ────────────────────────────────────────────────────────────
// POST /api/auth/register   ← Naya account banana
// Body: { name, email, password, phone, city }
// ────────────────────────────────────────────────────────────
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, city } = req.body;

    // Koi field khali nahi honi chahiye
    if (!name || !email || !password) {
      return res.status(400).json({ error: 'Naam, email aur password zaroori hain.' });
    }

    // Ye email pehle se registered to nahi hai?
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Ye email pehle se registered hai.' });
    }

    // User banao (password automatic hash hoga — model mein dekho)
    const user = await User.create({ name, email, password, phone, city });

    res.status(201).json({
      message: 'Account ban gaya! 🎉',
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
// POST /api/auth/login   ← Login karna
// Body: { email, password }
// ────────────────────────────────────────────────────────────
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email aur password dono chahiye.' });
    }

    // Password bhi saath lao (normally hidden rehta hai)
    const user = await User.findOne({ email }).select('+password');

    // User mila? Password sahi hai?
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Email ya password galat hai.' });
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
// GET /api/auth/me   ← Apni profile dekhna (login zaroori)
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
// PUT /api/auth/update-profile   ← Profile update karna
// ────────────────────────────────────────────────────────────
router.put('/update-profile', protect, async (req, res) => {
  try {
    const { name, phone, city } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { name, phone, city },
      { new: true }   // Updated user return karo
    );

    res.json({ message: 'Profile update ho gaya!', user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
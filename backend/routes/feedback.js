const express  = require('express');
const Feedback = require('../models/Feedback');        // from models folder
const { optionalAuth } = require('../middleware/auth'); // from middleware

const router = express.Router();

// ────────────────────────────────────────────────────────────
// POST /api/feedback   ← Submit feedback
// Login is optional — guests can also submit
// Body: { device, recycled, notes, rating }
// ────────────────────────────────────────────────────────────
router.post('/', optionalAuth, async (req, res) => {
  try {
    const { device, recycled, notes, rating } = req.body;

    if (!device || !recycled) {
      return res.status(400).json({ error: 'Device and recycled status are required.' });
    }

    const feedback = await Feedback.create({
      user:     req.user?._id || null, // If logged in, store user ID
      device,
      recycled,
      notes,
      rating,
    });

    res.status(201).json({
      message:  'Feedback submitted successfully! Thank you 🌱',
      feedback,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ────────────────────────────────────────────────────────────
// GET /api/feedback   ← Get all feedbacks
// ────────────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback
      .find()
      .populate('user', 'name email') // Also fetch user's name and email
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({ feedbacks, total: feedbacks.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
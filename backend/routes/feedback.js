const express  = require('express');
const Feedback = require('../models/Feedback');        // models folder se
const { optionalAuth } = require('../middleware/auth'); // middleware se

const router = express.Router();

// ────────────────────────────────────────────────────────────
// POST /api/feedback   ← Feedback submit karna
// Login optional — guest bhi de sakta hai
// Body: { device, recycled, notes, rating }
// ────────────────────────────────────────────────────────────
router.post('/', optionalAuth, async (req, res) => {
  try {
    const { device, recycled, notes, rating } = req.body;

    if (!device || !recycled) {
      return res.status(400).json({ error: 'Device aur recycled status zaroori hai.' });
    }

    const feedback = await Feedback.create({
      user:     req.user?._id || null, // Logged in hai to ID store karo
      device,
      recycled,
      notes,
      rating,
    });

    res.status(201).json({
      message:  'Feedback de diya! Shukriya 🌱',
      feedback,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ────────────────────────────────────────────────────────────
// GET /api/feedback   ← Saare feedbacks dekhna
// ────────────────────────────────────────────────────────────
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback
      .find()
      .populate('user', 'name email') // User ka naam bhi laao
      .sort({ createdAt: -1 })
      .limit(50);

    res.json({ feedbacks, total: feedbacks.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
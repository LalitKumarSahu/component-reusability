const jwt  = require('jsonwebtoken');
const User = require('../models/User');

// ── PROTECT: Login is required for this route ───────────
// Example: /api/pickup/my-requests — cannot be accessed without login
const protect = async (req, res, next) => {
  try {
    let token;

    // Look for token in header: "Authorization: Bearer xxxxx"
    if (req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ error: 'Please login first!' });
    }

    // Verify if token is valid
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if user exists in the database
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({ error: 'User not found.' });
    }

    next(); // Everything is fine, move to next middleware
  } catch (err) {
    return res.status(401).json({ error: 'Token is invalid or expired.' });
  }
};

// ── OPTIONAL AUTH: Attach user if logged in, otherwise treat as guest ─
// Example: /api/feedback — can be accessed by both logged-in users and guests
const optionalAuth = async (req, res, next) => {
  try {
    if (req.headers.authorization?.startsWith('Bearer ')) {
      const token   = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user      = await User.findById(decoded.id).select('-password');
    }
  } catch (_) {
    // No token or invalid token — continue as guest
  }
  next();
};

// ── ADMIN ONLY: Only admin users can access this ───────────
const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Access allowed for admin only!' });
  }
  next();
};

module.exports = { protect, optionalAuth, adminOnly };
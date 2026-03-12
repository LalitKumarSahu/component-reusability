const jwt  = require('jsonwebtoken');
const User = require('../models/User');

// ── PROTECT: Login zaroori hai is route ke liye ───────────
// Jaise: /api/pickup/my-requests — bina login ke nahi khulega
const protect = async (req, res, next) => {
  try {
    let token;

    // Header mein token dhundo: "Authorization: Bearer xxxxx"
    if (req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return res.status(401).json({ error: 'Pehle login karo!' });
    }

    // Token sahi hai ya nahi check karo
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // User database mein hai ya nahi dhundo
    req.user = await User.findById(decoded.id).select('-password');

    if (!req.user) {
      return res.status(401).json({ error: 'User nahi mila.' });
    }

    next(); // Sab theek hai, aage jao
  } catch (err) {
    return res.status(401).json({ error: 'Token invalid ya expire ho gaya.' });
  }
};

// ── OPTIONAL AUTH: Login hai to user attach karo, warna guest ─
// Jaise: /api/feedback — logged in bhi kar sakta, guest bhi
const optionalAuth = async (req, res, next) => {
  try {
    if (req.headers.authorization?.startsWith('Bearer ')) {
      const token   = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user      = await User.findById(decoded.id).select('-password');
    }
  } catch (_) {
    // Token nahi hai ya galat hai — koi baat nahi, guest maan lo
  }
  next();
};

// ── ADMIN ONLY: Sirf admin access kar sakta hai ───────────
const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ error: 'Sirf admin ke liye!' });
  }
  next();
};

module.exports = { protect, optionalAuth, adminOnly };
const express        = require('express');
const PickupRequest  = require('../models/PickupRequest');   // from models folder
const User           = require('../models/User');             // from models folder
const { protect, optionalAuth, adminOnly } = require('../middleware/auth'); // from middleware
const { upload, cloudinary } = require('../config/cloudinary'); // from config

const router = express.Router();

// ────────────────────────────────────────────────────────────
// POST /api/pickup   ← Submit a new pickup request
// Send images in the form as well (max 5)
// Login is optional — guests can also submit
// ────────────────────────────────────────────────────────────
router.post('/', optionalAuth, upload.array('images', 5), async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      address,
      city,
      pincode,
      notes,
      items,          // Will be received as a JSON string
      totalEstimate,
    } = req.body;

    // Parse items from JSON
    const parsedItems = typeof items === 'string' ? JSON.parse(items) : items;

    // Data of uploaded images from Cloudinary
    const images = (req.files || []).map((file) => ({
      url:      file.path,      // Cloudinary URL
      publicId: file.filename,  // ID used for deletion
    }));

    // Save in database
    const pickup = await PickupRequest.create({
      user:          req.user?._id || null,  // If logged in store ID, otherwise null
      customerName,
      customerEmail,
      customerPhone,
      address,
      city,
      pincode,
      notes,
      items:         Object.values(parsedItems),
      totalEstimate: parseFloat(totalEstimate),
      images,
      status:        'pending',
    });

    // If user is logged in, increment their pickup count
    if (req.user) {
      await User.findByIdAndUpdate(req.user._id, { $inc: { totalPickups: 1 } });
    }

    res.status(201).json({
      message:        'Pickup request submitted! We will contact you within 24 hours. 🚚',
      pickupId:       pickup._id,
      status:         pickup.status,
      totalEstimate:  pickup.totalEstimate,
      imagesUploaded: images.length,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ────────────────────────────────────────────────────────────
// GET /api/pickup/my-requests   ← View all my requests
// Login is required
// ────────────────────────────────────────────────────────────
router.get('/my-requests', protect, async (req, res) => {
  try {
    const pickups = await PickupRequest
      .find({ user: req.user._id })
      .sort({ createdAt: -1 }); // Newest first

    res.json({ pickups });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ────────────────────────────────────────────────────────────
// GET /api/pickup/:id   ← View a specific request
// ────────────────────────────────────────────────────────────
router.get('/:id', protect, async (req, res) => {
  try {
    const pickup = await PickupRequest
      .findById(req.params.id)
      .populate('user', 'name email'); // Also fetch user name and email

    if (!pickup) {
      return res.status(404).json({ error: 'Request not found.' });
    }

    // Only the owner or admin can view this request
    if (pickup.user?._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'This is not your request.' });
    }

    res.json({ pickup });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ────────────────────────────────────────────────────────────
// GET /api/pickup   ← View all requests (admin only)
// ────────────────────────────────────────────────────────────
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.query; // Can filter like ?status=pending
    const filter = status ? { status } : {};

    const pickups = await PickupRequest
      .find(filter)
      .populate('user', 'name email phone')
      .sort({ createdAt: -1 });

    res.json({ pickups, total: pickups.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ────────────────────────────────────────────────────────────
// PUT /api/pickup/:id/status   ← Update status (admin)
// Body: { status, finalAmount }
// ────────────────────────────────────────────────────────────
router.put('/:id/status', protect, adminOnly, async (req, res) => {
  try {
    const { status, finalAmount } = req.body;

    const pickup = await PickupRequest.findByIdAndUpdate(
      req.params.id,
      {
        status,
        ...(finalAmount && { finalAmount }),
      },
      { new: true }
    );

    if (!pickup) {
      return res.status(404).json({ error: 'Request not found.' });
    }

    // If completed and finalAmount exists, increase user's earnings
    if (status === 'completed' && pickup.user && finalAmount) {
      await User.findByIdAndUpdate(pickup.user, {
        $inc: { totalEarnings: parseFloat(finalAmount) }
      });
    }

    res.json({ message: 'Status updated successfully!', pickup });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ────────────────────────────────────────────────────────────
// DELETE /api/pickup/:id   ← Cancel a request
// ────────────────────────────────────────────────────────────
router.delete('/:id', protect, async (req, res) => {
  try {
    const pickup = await PickupRequest.findById(req.params.id);

    if (!pickup) {
      return res.status(404).json({ error: 'Request not found.' });
    }

    // Only the owner or admin can delete this request
    if (pickup.user?.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Permission denied.' });
    }

    // Also delete images from Cloudinary
    for (const img of pickup.images) {
      if (img.publicId) {
        await cloudinary.uploader.destroy(img.publicId);
      }
    }

    await pickup.deleteOne();
    res.json({ message: 'Request has been cancelled.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
const express        = require('express');
const PickupRequest  = require('../models/PickupRequest');   // models folder se
const User           = require('../models/User');             // models folder se
const { protect, optionalAuth, adminOnly } = require('../middleware/auth'); // middleware se
const { upload, cloudinary } = require('../config/cloudinary'); // config se

const router = express.Router();

// ────────────────────────────────────────────────────────────
// POST /api/pickup   ← Naya pickup request submit karna
// Form mein images bhi bhejo (max 5)
// Login optional hai — guest bhi kar sakta hai
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
      items,          // JSON string ke form mein aayega
      totalEstimate,
    } = req.body;

    // Items ko JSON se parse karo
    const parsedItems = typeof items === 'string' ? JSON.parse(items) : items;

    // Cloudinary par jo images upload hui hain unka data
    const images = (req.files || []).map((file) => ({
      url:      file.path,      // Cloudinary ka URL
      publicId: file.filename,  // Delete ke liye ID
    }));

    // Database mein save karo
    const pickup = await PickupRequest.create({
      user:          req.user?._id || null,  // Logged in hai to ID, warna null
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

    // Agar logged in hai to uske pickup count badhao
    if (req.user) {
      await User.findByIdAndUpdate(req.user._id, { $inc: { totalPickups: 1 } });
    }

    res.status(201).json({
      message:        'Pickup request submit ho gayi! 24 ghante mein contact karenge. 🚚',
      pickupId:        pickup._id,
      status:          pickup.status,
      totalEstimate:   pickup.totalEstimate,
      imagesUploaded:  images.length,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ────────────────────────────────────────────────────────────
// GET /api/pickup/my-requests   ← Meri saari requests dekhna
// Login zaroori hai
// ────────────────────────────────────────────────────────────
router.get('/my-requests', protect, async (req, res) => {
  try {
    const pickups = await PickupRequest
      .find({ user: req.user._id })
      .sort({ createdAt: -1 }); // Newest pehle

    res.json({ pickups });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ────────────────────────────────────────────────────────────
// GET /api/pickup/:id   ← Ek specific request dekhna
// ────────────────────────────────────────────────────────────
router.get('/:id', protect, async (req, res) => {
  try {
    const pickup = await PickupRequest
      .findById(req.params.id)
      .populate('user', 'name email'); // User ka naam aur email bhi laao

    if (!pickup) {
      return res.status(404).json({ error: 'Request nahi mili.' });
    }

    // Sirf apni request dekh sakta hai (ya admin)
    if (pickup.user?._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Ye tumhari request nahi hai.' });
    }

    res.json({ pickup });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ────────────────────────────────────────────────────────────
// GET /api/pickup   ← Saari requests dekhna (sirf admin)
// ────────────────────────────────────────────────────────────
router.get('/', protect, adminOnly, async (req, res) => {
  try {
    const { status } = req.query; // ?status=pending filter kar sako
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
// PUT /api/pickup/:id/status   ← Status update karna (admin)
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
      return res.status(404).json({ error: 'Request nahi mili.' });
    }

    // Agar completed ho gaya aur finalAmount hai to user ki earnings badhao
    if (status === 'completed' && pickup.user && finalAmount) {
      await User.findByIdAndUpdate(pickup.user, {
        $inc: { totalEarnings: parseFloat(finalAmount) }
      });
    }

    res.json({ message: 'Status update ho gaya!', pickup });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ────────────────────────────────────────────────────────────
// DELETE /api/pickup/:id   ← Request cancel karna
// ────────────────────────────────────────────────────────────
router.delete('/:id', protect, async (req, res) => {
  try {
    const pickup = await PickupRequest.findById(req.params.id);

    if (!pickup) {
      return res.status(404).json({ error: 'Request nahi mili.' });
    }

    // Sirf apni request delete kar sakta hai (ya admin)
    if (pickup.user?.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Permission nahi hai.' });
    }

    // Cloudinary se images bhi delete karo
    for (const img of pickup.images) {
      if (img.publicId) {
        await cloudinary.uploader.destroy(img.publicId);
      }
    }

    await pickup.deleteOne();
    res.json({ message: 'Request cancel ho gayi.' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
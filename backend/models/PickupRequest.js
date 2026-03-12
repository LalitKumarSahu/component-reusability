const mongoose = require('mongoose');

// Ek item ka structure (e.g. Mobile - Battery - qty 2)
const itemSchema = new mongoose.Schema({
  category:       String,  // e.g. "Mobile"
  component:      String,  // e.g. "Battery"
  quantity:       Number,
  estimatedValue: Number,
});

// Image ka structure (Cloudinary se)
const imageSchema = new mongoose.Schema({
  url:      String,  // Cloudinary image link
  publicId: String,  // Cloudinary ID (delete ke liye)
});

// Pickup Request ka poora structure
const pickupRequestSchema = new mongoose.Schema({

  // Kaun ne request ki (agar logged in hai to)
  user: {
    type:    mongoose.Schema.Types.ObjectId,
    ref:     'User',     // User model se linked
    default: null,       // Guest bhi kar sakta hai
  },

  // Customer ki details
  customerName:  { type: String, required: true },
  customerEmail: { type: String, required: true },
  customerPhone: { type: String, required: true },

  // Address
  address: { type: String, required: true },
  city:    { type: String, required: true },
  pincode: { type: String, required: true },
  notes:   { type: String, default: '' },

  // Kaunse items dene hain
  items: [itemSchema],

  // Kitna milega (estimate)
  totalEstimate: { type: Number, required: true },
  finalAmount:   { type: Number, default: null },  // Inspection ke baad

  // Device ki photos
  images: [imageSchema],

  // Request ka status
  status: {
    type:    String,
    enum:    ['pending', 'confirmed', 'picked_up', 'completed', 'cancelled'],
    default: 'pending',
  },

  // Pickup ka time (admin set karega)
  scheduledAt: { type: Date, default: null },

}, { timestamps: true });

module.exports = mongoose.model('PickupRequest', pickupRequestSchema);
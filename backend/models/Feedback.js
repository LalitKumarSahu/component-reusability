const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({

  // Agar logged in hai to user ka ID store hoga
  user: {
    type:    mongoose.Schema.Types.ObjectId,
    ref:     'User',
    default: null,
  },

  device:   { type: String, required: true },             // e.g. "Mobile"
  recycled: { type: String, enum: ['yes', 'no'], required: true },
  notes:    { type: String, default: '' },
  rating:   { type: Number, min: 1, max: 5, default: null },

}, { timestamps: true });

module.exports = mongoose.model('Feedback', feedbackSchema);
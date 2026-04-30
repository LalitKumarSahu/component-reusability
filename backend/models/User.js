const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

// User database schema
const userSchema = new mongoose.Schema({

  name: {
    type:     String,
    required: [true, 'Name is required'],
    trim:     true,
  },

  email: {
    type:      String,
    required:  [true, 'Email is required'],
    unique:    true,       // Only one account per email
    lowercase: true,
  },

  password: {
    type:      String,
    required:  [true, 'Password is required'],
    minlength: 6,
    select:    false,     // Password will not be included in responses by default
  },

  phone: {
    type: String,
    default: '',
  },

  city: {
    type:    String,
    default: 'Lucknow',
  },

  role: {
    type:    String,
    enum:    ['user', 'admin'],  // Only these two options are allowed
    default: 'user',
  },

  // User statistics
  totalPickups:  { type: Number, default: 0 },
  totalEarnings: { type: Number, default: 0 },

}, { timestamps: true }); // Automatically adds createdAt and updatedAt

// ── Hash password before saving ────────────────
userSchema.pre('save', async function (next) {
  // Only hash if the password has been modified
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// ── Method to compare password during login ─────────
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
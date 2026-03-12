const mongoose = require('mongoose');
const bcrypt   = require('bcryptjs');

// User ka database structure
const userSchema = new mongoose.Schema({

  name: {
    type:     String,
    required: [true, 'Naam zaroori hai'],
    trim:     true,
  },

  email: {
    type:     String,
    required: [true, 'Email zaroori hai'],
    unique:   true,       // Ek hi email se ek account
    lowercase: true,
  },

  password: {
    type:      String,
    required:  [true, 'Password zaroori hai'],
    minlength: 6,
    select:    false,     // Password by default response mein nahi aayega
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
    enum:    ['user', 'admin'],  // Sirf ye do options
    default: 'user',
  },

  // User ka stats
  totalPickups:  { type: Number, default: 0 },
  totalEarnings: { type: Number, default: 0 },

}, { timestamps: true }); // createdAt aur updatedAt automatic

// ── Password save hone se pehle hash karo ────────────────
userSchema.pre('save', async function (next) {
  // Sirf tab hash karo jab password change hua ho
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// ── Login ke waqt password check karne ka method ─────────
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
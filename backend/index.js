// SSL Fix - this line should be at the very top
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const express  = require('express');
const cors     = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const authRoutes      = require('./routes/auth');
const pickupRoutes    = require('./routes/pickup');
const componentRoutes = require('./routes/components');
const centerRoutes    = require('./routes/centers');
const feedbackRoutes  = require('./routes/feedback');

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── MongoDB Connection ────────────────────────────────────
const connectDB = async () => {
  let retries = 5;
  while (retries > 0) {
    try {
      await mongoose.connect(process.env.MONGO_URI, {
        ssl: true,
        tls: true,
        tlsAllowInvalidCertificates: true,
        tlsAllowInvalidHostnames: true,
        serverSelectionTimeoutMS: 10000,
        socketTimeoutMS: 45000,
      });
      console.log('✅ MongoDB connected!');
      break;
    } catch (err) {
      retries--;
      console.log(`❌ MongoDB connection failed. ${retries} retries left...`);
      if (retries === 0) {
        console.error('Unable to connect to MongoDB:', err.message);
      } else {
        // Wait for 3 seconds and try again
        await new Promise(res => setTimeout(res, 3000));
      }
    }
  }
};

connectDB();

// ── Routes ───────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({ status: 'OK', message: 'ReUseIt Backend Running 🌱' });
});

app.use('/api/auth',       authRoutes);
app.use('/api/pickup',     pickupRoutes);
app.use('/api/components', componentRoutes);
app.use('/api/centers',    centerRoutes);
app.use('/api/feedback',   feedbackRoutes);

// ── Server Start ──────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`🚀 Server is running at: http://localhost:${PORT}`);
});
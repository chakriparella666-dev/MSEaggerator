require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const dashboardRoutes = require('./routes/dashboard');
const passport = require('./config/passport');

const app = express();
const PORT = process.env.PORT || 5000;

// ──── Middleware ────
app.use(cors());
app.use(express.json());
app.use(passport.initialize());

// ──── Routes ────
app.get('/', (req, res) => res.status(200).json({ message: 'MSE Aggregator API is running' }));
app.use('/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);

// ──── Health check ────
app.get('/health', (req, res) => res.status(200).json({ status: 'ok' }));

// ──── Connect to MongoDB & start server ────
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/final_project')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  });

module.exports = app;

const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const passport = require('passport');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// ──── Signup ────
router.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    console.log(`Signup attempt: ${email}, role: ${role}`);

    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      console.log('User already exists');
      return res.status(400).json({ message: 'Email already registered.' });
    }

    const newUser = await User.create({ name, email, password, role: role || 'owner' });
    console.log(`User created successfully: ${newUser._id}`);

    const token = jwt.sign({ id: newUser._id, role: newUser.role }, JWT_SECRET, { expiresIn: '1d' });

    res.status(201).json({
      token,
      user: { id: newUser._id, name: newUser.name, email: newUser.email, role: newUser.role }
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Error creating user.' });
  }
});

// ──── Login ────
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(`Login attempt: ${email}`);

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      console.log(`User not found: ${email}`);
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      console.log(`Invalid password for: ${email}`);
      return res.status(401).json({ message: 'Invalid credentials.' });
    }

    console.log(`Login successful: ${email}`);
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, { expiresIn: '1d' });

    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Error logging in.' });
  }
});

// ──── Google OAuth ────
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: 'http://localhost:3000/login' }),
  (req, res) => {
    try {
      const token = jwt.sign({ id: req.user._id, role: req.user.role }, JWT_SECRET, { expiresIn: '1d' });
      const user = {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role || 'owner'
      };

      // Redirect to frontend with token info
      const frontendUrl = `http://localhost:3000/login?token=${token}&role=${user.role}&user=${encodeURIComponent(JSON.stringify(user))}`;
      res.redirect(frontendUrl);
    } catch (err) {
      console.error('Google callback error:', err);
      res.redirect('http://localhost:3000/login?error=auth_failed');
    }
  }
);

module.exports = router;

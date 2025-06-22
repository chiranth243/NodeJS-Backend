// routes/authRoutes.js
const express = require('express');
const router  = express.Router();
const jwt     = require('jsonwebtoken');
const db      = require('../models');

/* -------------------------------------------------
   POST /api/auth/signup
   -------------------------------------------------*/
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password)
    return res.status(400).json({ message: 'Missing fields' });

  try {
    /* check if user already exists */
    const existing = await db.User.findOne({ where: { email } });
    if (existing)
      return res.status(409).json({ message: 'Email already registered' });

    /* ➕ create the user (PLAIN-TEXT password) */
    const user = await db.User.create({ name, email, password });

    /* issue token */
    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '2h' }
    );

    return res.status(201).json({ token, user });
  } catch (err) {
    console.error('Signup error:', err);
    return res.status(500).json({ message: 'Signup failed' });
  }
});

/* -------------------------------------------------
   POST /api/auth/login   (plain-text check)
   -------------------------------------------------*/
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await db.User.findOne({ where: { email } });

    if (!user) return res.status(401).json({ message: 'Invalid credentials' });

    const validPassword = password === user.password;

    if (!validPassword) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      process.env.JWT_SECRET || 'f68e0c1fadc87a1c6820fd9e1b0ff7de7f7a23c9b4a9923c50c3d03813f7cf24',
      { expiresIn: '2h' }
    );

    res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Login failed' });
  }
});


module.exports = router;

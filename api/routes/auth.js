// File: api/routes/auth.js

console.log("🔍 You are in the REAL auth.js");
require('dotenv').config(); 


const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();

const prisma = new PrismaClient();

router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, passwordHash: hashed, name },
  });
  res.status(201).json(user);
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    return res.status(400).json({ error: 'Invalid credentials' });
  }

  console.log("JWT_SECRET:", process.env.JWT_SECRET);
  const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
//    const token = jwt.sign({ id: user.id, email: user.email }, 'my_super_secret_key', {
//     expiresIn: '1d',
//    });
  

  res.cookie('token', token, { httpOnly: true });
  res.json({ success: true });
});

router.post('/logout', (req, res) => {
  res.clearCookie('token').json({ success: true });
});

module.exports = router;

const express = require('express');
const authRoutes = require('./auth');
const mealRoutes = require('./meals');
const router = express.Router();
const userRoutes = require('./users');

router.get('/ping', (req, res) => res.send('pong'));

router.use('/auth', authRoutes);
router.use('/meals', mealRoutes);
router.use('/users', userRoutes); 


module.exports = router;

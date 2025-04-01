const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { requireAuth } = require('../middleware/requireAuth');
const router = express.Router();

const prisma = new PrismaClient();

// GET only the current user's meals
router.get('/', requireAuth, async (req, res) => {
  const userId = req.user.id;
  const meals = await prisma.meal.findMany({
    where: { userId },
    orderBy: { createdAt: 'desc' }, // newest first
  });
  res.json(meals);
});

router.post('/', requireAuth, async (req, res) => {
  const { name, description, ingredients, instructions } = req.body;
  const userId = req.user.id;

  const meal = await prisma.meal.create({
    data: {
      name,
      description,
      ingredients,
      instructions,
      userId,
    },
  });

  res.status(201).json(meal);
});

module.exports = router;

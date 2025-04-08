// File: api/routes/meals.js

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

router.get('/:id', requireAuth, async (req, res) => {
  const meal = await prisma.meal.findUnique({
    where: { id: req.params.id },
  });

  if (!meal || meal.userId !== req.user.id) {
    return res.status(404).json({ error: 'Meal not found' });
  }

  res.json(meal);
});

router.put('/:id', requireAuth, async (req, res) => {
  const { name, description, ingredients, instructions } = req.body;

  const existing = await prisma.meal.findUnique({
    where: { id: req.params.id },
  });

  if (!existing || existing.userId !== req.user.id) {
    return res.status(404).json({ error: 'Meal not found or unauthorized' });
  }

  const updated = await prisma.meal.update({
    where: { id: req.params.id },
    data: { name, description, ingredients, instructions },
  });

  res.json(updated);
});

router.delete('/:id', requireAuth, async (req, res) => {
  const existing = await prisma.meal.findUnique({
    where: { id: req.params.id },
  });

  if (!existing || existing.userId !== req.user.id) {
    return res.status(404).json({ error: 'Meal not found or unauthorized' });
  }

  await prisma.meal.delete({
    where: { id: req.params.id },
  });

  res.json({ success: true });
});


module.exports = router;

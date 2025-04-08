// File: api/routes/mealplans.js

const express = require('express');
const { PrismaClient } = require('@prisma/client');
const { requireAuth } = require('../middleware/requireAuth');
const router = express.Router();

const prisma = new PrismaClient();

// Get all planned meals for the current user
router.get('/', requireAuth, async (req, res) => {
  const plans = await prisma.mealPlan.findMany({
    where: { userId: req.user.id },
    include: { meal: true },
    orderBy: [{ date: 'asc' }, { mealTime: 'asc' }]
  });
  res.json(plans);
});

// Add a meal to a specific day/time
router.post('/', requireAuth, async (req, res) => {
  const { date, mealTime, mealId, note } = req.body;

  const plan = await prisma.mealPlan.create({
    data: {
      userId: req.user.id,
      date: new Date(date),
      mealTime,
      mealId,
      note
    }, 
    include: {
      meal: true // After creating the new plan in POST /api/mealplans, fetch the meal details via include: { meal: true }.
    }
  });

  res.status(201).json(plan);
});

// Update a planned meal
router.put('/:id', requireAuth, async (req, res) => {
  const { date, mealTime, mealId, note } = req.body;

  const existing = await prisma.mealPlan.findUnique({ where: { id: req.params.id } });
  if (!existing || existing.userId !== req.user.id) {
    return res.status(403).json({ error: 'Not authorized or not found' });
  }

  const updated = await prisma.mealPlan.update({
    where: { id: req.params.id },
    data: { date: new Date(date), mealTime, mealId, note }
  });

  res.json(updated);
});

// Remove a planned meal
router.delete('/:id', requireAuth, async (req, res) => {
  const existing = await prisma.mealPlan.findUnique({ where: { id: req.params.id } });
  if (!existing || existing.userId !== req.user.id) {
    return res.status(403).json({ error: 'Not authorized or not found' });
  }

  await prisma.mealPlan.delete({ where: { id: req.params.id } });
  res.json({ success: true });
});

module.exports = router;

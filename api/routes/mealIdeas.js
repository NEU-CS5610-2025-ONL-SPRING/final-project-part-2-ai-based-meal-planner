// api/routes/mealIdeas.js
const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post('/', async (req, res) => {
  const { preferences } = req.body;

  try {
    const prompt = `Give me 1 creative meal idea including name, short description, ingredients, and instructions. Preferences: ${preferences}`;

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7,
    });

    const reply = completion.choices[0].message.content;
    console.log('🔍 OpenAI Raw Reply:\n', reply);

    // Updated parsing logic
    const nameMatch = reply.match(/Name:\s*(.+)/i);
    const descMatch = reply.match(/Description:\s*(.+)/i);
    const ingredientsMatch = reply.match(/Ingredients:\s*([\s\S]*?)\n\s*Instructions:/i);
    const instructionsMatch = reply.match(/Instructions:\s*([\s\S]*)/i);

    const meal = {
      name: nameMatch?.[1]?.trim() || 'AI Meal',
      description: descMatch?.[1]?.trim() || '',
      ingredients: ingredientsMatch?.[1]?.trim() || '',
      instructions: instructionsMatch?.[1]?.trim() || '',
    };

    res.json(meal);
  } catch (err) {
    console.error('🔴 OpenAI Error:', err);
    res.status(500).json({ error: 'OpenAI request failed' });
  }
});

module.exports = router;
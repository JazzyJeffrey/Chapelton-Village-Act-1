// routes.js
const express = require('express');
const db = require('./db');

const router = express.Router();

router.get('/api/items/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const item = await db.getItemById(id);
    res.json(item);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching the item' });
  }
});

module.exports = router;

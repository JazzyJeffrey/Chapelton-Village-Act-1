// routes.js
const express = require('express');
const db = require('./db');

const router = express.Router();

// Route to get items by ID
router.get('/api/items/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const item = await db.getItemById(id);
    if (item) {
      res.json(item);
    } else {
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (error) {
    console.error('Error fetching item:', error.message);
    res.status(500).json({ message: 'An error occurred while fetching the item' });
  }
});

// Route to get weapon by weapon ID
router.get('/api/weapons/:weaponId', async (req, res) => {
  const weaponId = req.params.weaponId;
  const weapon = await db.getWeaponById(weaponId);
  try {
    if (weapon) {
      res.json(weapon);
    } else {
      res.status(404).json({ message: 'Weapon not found' });
    }
  } catch (error) {
    console.error("Error fetching weapon:", error.message);
    res.status(500).json({ message: 'An error occured while fetching the weapon'});
  }
});

// Route to get armor by ID
router.get('/api/armor/:armorId', async (req, res) => {
  const armorId = req.params.armorId;
  const armor = await db.getArmorById(armorId)
  try {
    const armor = await db.getArmorById(id);
    if (armor) {
      res.json(armor);
    } else {
      res.status(404).json({ message: 'Armor not found' });
    }
  } catch (error) {
    console.error("Error fetching armor:", error.message);
    res.status(500).json({ message: 'An error occured while fetching the armor'});
  }
});

// Route to get enemy by enemy ID
router.get('/api/enemies/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const enemy = await db.getEnemyById(id);
    if (enemy) {
      res.json(enemy);
    } else {
      res.status(404).json({ message: 'Enemy not found' });
    }
  } catch (error) {
    console.error('Error executing query', error.stack);
    res.status(500).json({ message: 'Server error' });
  }
});

// Route to get drop items by enemy ID
router.get('/api/drops/:enemyId', async (req, res) => {
  const enemyId = req.params.enemyId;
  try {
    const dropItems = await getDropItemsByEnemyId(enemyId);
    if (dropItems) {
      res.json(dropItems);
    } else {
      res.status(404).json({ message: 'Drop table not found' });
    }
  } catch (error) {
    console.error('Error fetching drop items', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

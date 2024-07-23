// db.js
require('dotenv').config();
const { Client } = require('pg');

const client = new Client({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

client.connect()
    .then(() => console.log("Connected to database"))
    .catch(err => console.log("Connection error", err.stack));

async function getItemById(id) {
  const result = await client.query('SELECT * FROM items WHERE id = $1', [id]);
  return result.rows[0];
}

async function getWeaponById(id) {
  const result = await client.query('SELECT * FROM weapons WHERE id = $1', [id]);
  return result.rows[0];
}

async function getArmorById(id) {
  const result = await client.query('SELECT * FROM armor WHERE id = $1', [id]);
  return result.rows[0];
}

async function getEnemyById(id) {
  const result = await client.query('SELECT * FROM enemies WHERE id = $1', [id]);
  return result.rows[0];
}

async function getDropItemsByEnemyId(enemyId) {
  const result = await client.query('SELECT * FROM drops WHERE enemy_id = $1', [enemyId]);
  return result.rows;
}



module.exports = {
  getItemById,
  getArmorById,
  getWeaponById,
  getEnemyById,
  getDropItemsByEnemyId
};

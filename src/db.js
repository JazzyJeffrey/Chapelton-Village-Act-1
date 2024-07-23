// db.js
const { Client } = require('pg');

const client = new Client({
  user: 'yourusername',
  host: 'localhost',
  database: 'yourdatabase',
  password: 'yourpassword',
  port: 5432,
});

client.connect()
    .then(() => console.log("Connected to database"))
    .catch(err => console.log("Connection error", err.stack));

async function getItemById(id) {
  const result = await client.query('SELECT * FROM items WHERE id = $1', [id]);
  return result.rows[0];
}

module.exports = {
  getItemById,
};

// server.js
const express = require('express');
const routes = require('./routes');
const path = require('path');

const app = express();
const port = 8080;

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.get('/game', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/game.html'));
});

app.use(routes);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});

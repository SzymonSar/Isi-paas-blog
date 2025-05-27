const express = require("express");
const app = express();
const port = process.env.PORT || 3001;


//wyslanie html do klienta
app.get("/", (req, res) => res.type('html').send(html));

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

server.keepAliveTimeout = 120 * 1000;
server.headersTimeout = 120 * 1000;

//pobieranie html z pliku
const fs = require('fs');
const path = require('path');

const html = fs.readFileSync(path.join(__dirname, 'app.html'), 'utf-8');

const { Pool } = require('pg');

// Połączenie z bazą
const pool = new Pool({
  connectionString: process.env.LINKEXT
});

// test bazy danych
app.get('/test-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT 1');  
    res.status(200).send({ result });
  } catch (err) {
    console.error('Błąd zapytania:', err);
    res.status(500).send('Błąd połączenia z bazą danych');
  }
});
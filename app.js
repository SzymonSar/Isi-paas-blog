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
  connectionString: process.env.LINKINT,
  ssl: {
    rejectUnauthorized: false
  }
});

// test bazy danych
app.get('/get-db', async (req, res) => {
  try {
    const result = await pool.query('SELECT * from chat');
    res.send(result.rows);
  } catch (err) {
    console.log('Tablica nie istnieje, tworze tablice')
    try{
      const result = await pool.query(`CREATE TABLE chat (
         id SERIAL PRIMARY KEY,
         nazwa TEXT NOT NULL,
         zawartosc TEXT NOT NULL
         );`)
      res.send("Tabela zostala stworzona");
    }catch(err){
    console.error('Błąd zapytania:', err);
    res.status(500).send('Błąd połączenia z bazą danych');
    }
  }
});
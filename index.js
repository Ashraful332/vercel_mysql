const express = require('express');
const cors = require('cors') ;
const app = express();
const mysql = require('mysql2');
// const dotenv = require('dotenv');
const db  = require('./DB/mysql');
const port = 5000


app.use(express.json());
app.use(cors());
// dotenv.config();
require("dotenv").config();


// database
console.log(`${process.env.MYSQLHOST},${process.env.MYSQLUSER},${process.env.MYSQLPASSWORD},${process.env.MYSQLDATABASE},${process.env.MYSQLPORT}`);


app.get('/', (req, res) => {
  res.send('The server is running! V.1')
});


// test ----- on user
// GET users
app.get("/users", (req, res) => {
  db.query("SELECT * FROM users", (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
});

// POST user
app.post("/users", (req, res) => {
  const { name, email } = req.body;
  db.query(
    "INSERT INTO users (name, email) VALUES (?, ?)",
    [name, email],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json({ message: "✅ ইউজার যোগ হয়েছে", id: result.insertId });
    }
  );
});


// -------------------------- mack a todo app ------------------------

// সব টুডু নিয়ে আসার API
app.get('/get', (req, res) => {
  db.query('SELECT * FROM todos', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// নতুন টুডু যোগ করার API
app.post('/post', (req, res) => {
  const { text, completed } = req.body;
  db.query(
    'INSERT INTO todos (text, completed) VALUES (?, ?)',
    [text, completed],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      // Inserted আইডি নিয়ে নতুন টুডু রিটার্ন করব
      db.query('SELECT * FROM todos WHERE id = ?', [results.insertId], (err2, data) => {
        if (err2) return res.status(500).json({ error: err2.message });
        res.json(data[0]);
      });
    }
  );
});

// টুডু আপডেট করার API (টগল complete/incomplete)
app.put('/put', (req, res) => {
  const { id, text, completed } = req.body;
  db.query(
    'UPDATE todos SET text = ?, completed = ? WHERE id = ?',
    [text, completed, id],
    (err) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: 'Updated successfully' });
    }
  );
});

// টুডু ডিলিট করার API
app.delete('/delete', (req, res) => {
  const { id } = req.body;
  db.query('DELETE FROM todos WHERE id = ?', [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Deleted successfully' });
  });
});




app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});
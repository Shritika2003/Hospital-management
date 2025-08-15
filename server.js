const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from /public

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // your MySQL username
  password: '',         // your MySQL password (keep empty if none)
  database: 'hospital_db'  // your database name
});

db.connect((err) => {
  if (err) {
    console.error('❌ DB connection failed:', err.message);
    return;
  }
  console.log('✅ Connected to DB');
});

// Welcome Page Route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Appointment Route
app.post('/appointment', (req, res) => {
  const { name, email, date, time, reason } = req.body;

  // Validate form data
  if (!name || !email || !date || !time || !reason) {
    return res.status(400).send("❌ All fields are required");
  }

  const sql = `INSERT INTO appointments (name, email, date, time, reason) VALUES (?, ?, ?, ?, ?)`;
  const values = [name, email, date, time, reason];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('❌ Database error:', err.message);
      return res.status(500).send('❌ Database error: ' + err.message);
    }

    // ✅ Send success message with redirect
    res.send(`
      <html>
        <head>
          <meta http-equiv="refresh" content="2;url=/" />
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f0fff0;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
            }
            .message {
              font-size: 24px;
              color: green;
            }
          </style>
        </head>
        <body>
          <div class="message">✅ Appointment booked successfully! Redirecting to Welcome page...</div>
        </body>
      </html>
    `);
  });
});

// Start the Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

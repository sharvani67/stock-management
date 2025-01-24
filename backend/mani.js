const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'stock',
});

db.connect((err) => {
  if (err) throw err;
  console.log('MySQL Connected...');
});

// Get all users
app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

  // Get all sites (GET)
  app.get('/sites', (req, res) => {
    const query = 'SELECT * FROM sites';
    
    db.query(query, (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error fetching sites');
      }
      
      // Send all the sites as the response
      res.send(results);
    });
  });

// Add a new user
app.post('/users', (req, res) => {
  const { name, mobile, email, role } = req.body;
  const query = 'INSERT INTO users (name, mobile, email, role) VALUES (?, ?, ?, ?)';
  db.query(query, [name, mobile, email, role], (err, results) => {
    if (err) throw err;
    res.send({ id: results.insertId, name, mobile, email, role });
  });
});


// Add a new site (POST)
app.post('/sites', (req, res) => {
    const { siteCode, siteName, inchargeName, location, city, state, siteManager, inchargeMobile } = req.body;
    
    // Insert data into the 'sites' table
    const query = `INSERT INTO sites (site_code, site_name, incharge_name, location, city, state, site_manager, incharge_mobile) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
    
    db.query(query, [siteCode, siteName, inchargeName, location, city, state, siteManager, inchargeMobile], (err, results) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Error adding site');
      }
      
      // Respond with the newly added site data (with generated ID)
      res.status(201).send({
        id: results.insertId,
        siteCode,
        siteName,
        inchargeName,
        location,
        city,
        state,
        siteManager,
        inchargeMobile
      });
    });
  });
  

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

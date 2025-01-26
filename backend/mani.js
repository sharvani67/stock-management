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

  // API route to save data
app.post("/units", (req, res) => {
  const { serialNo, name, shortName, baseUnit } = req.body;

  if (!serialNo || !name || !shortName || !baseUnit) {
    return res.status(400).send({ message: "All fields are required." });
  }

  const sql = "INSERT INTO units (serialNo, name, shortName, baseUnit) VALUES (?, ?, ?, ?)";
  db.query(sql, [serialNo, name, shortName, baseUnit], (err, result) => {
    if (err) {
      console.error("Error saving data:", err);
      return res.status(500).send({ message: "Error saving data." });
    }
    res.status(200).send({ message: "Unit added successfully!" });
  });
});

// GET API to fetch units
app.get("/units", (req, res) => {
  const sqlQuery = "SELECT * FROM units";
  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ message: "Error fetching data" });
    } else {
      res.status(200).json(results);
    }
  });
});

// API Endpoint to handle stock-in form submission
app.post("/add-stock", (req, res) => {
  const {
      site_name,
      site_code,
      date,
      time,
      transaction_type,
      supplierName,
      supplier_id,
      receiver,
      productName,
      product_id,
      brandName,
      brand_id,
      units,
      quantity,
      quantity_out,
      available_quantity,
      billNumber,
      tran_id,
  } = req.body;

  const query = `
      INSERT INTO stockledger (
          site_name, site_code, date, time, transaction_type, supplier,
          supplier_id, receiver, product, product_id, brand, brand_id,
          units, quantity_in, quantity_out, available_quantity, invoice_no, tran_id
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
      query,
      [
          site_name,
          site_code,
          date,
          time,
          transaction_type,
          supplierName,
          supplier_id,
          receiver,
          productName,
          product_id,
          brandName,
          brand_id,
          units,
          quantity,
          quantity_out,
          available_quantity,
          billNumber,
          tran_id,
      ],
      (err, result) => {
          if (err) {
              console.error("Error inserting data:", err);
              res.status(500).json({ message: "Failed to add stock" });
          } else {
              res.status(200).json({ message: "Stock added successfully" });
          }
      }
  );
});
  

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

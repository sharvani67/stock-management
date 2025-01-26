const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", // Use your XAMPP password
  database: "allocation_db", // Replace with your database name
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// GET Allocations
app.get("/allocations", (req, res) => {
  const sql = "SELECT * FROM allocations";
  db.query(sql, (err, result) => {
    if (err) {
      res.status(500).json({ error: "Error fetching data from database" });
    } else {
      res.status(200).json(result);
    }
  });
});

// POST New Allocation
app.post("/allocations", (req, res) => {
  const { siteName, manager, productName, stockOutward, remainingStock } = req.body;
  const sql = "INSERT INTO allocations (siteName, manager, productName, stockOutward, remainingStock) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [siteName, manager, productName, stockOutward, remainingStock], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Error inserting data into database" });
    } else {
      res.status(201).json({ message: "Allocation added successfully", id: result.insertId });
    }
  });
});

// sledgetable post
app.post("/stockout", (req, res) => {
  const {
      site_name,
      site_code,
      date,
      time,
      transaction_type,
      supplierName,
      supplier_id,
      destinationSite,
      productName,
      product_id,
      brandName,
      brand_id,
      units,
      quantity_in,
      quantity,
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
          destinationSite,
          productName,
          product_id,
          brandName,
          brand_id,
          units,
          quantity_in,
          quantity,
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

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

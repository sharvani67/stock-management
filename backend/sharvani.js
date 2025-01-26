const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000; // Backend server port

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
  host: "localhost", // Your MySQL server host
  user: "root",      // Your MySQL username
  password: "",      // Your MySQL password (leave blank if none)
  database: "stock", // Your MySQL database name
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    return;
  }
  console.log("Connected to the MySQL database.");
});

// POST API to add a supplier
app.post("/api/suppliers", (req, res) => {
  const { supplierName, contact, email, address } = req.body;

  // Validate input
  if (!supplierName || !contact || !email || !address) {
    return res.status(400).json({ message: "All fields are required." });
  }

  // Insert supplier into database
  const query = "INSERT INTO suppliers (suppliername, contact, email, address) VALUES (?, ?, ?, ?)";
  db.query(query, [supplierName, contact, email, address], (err, result) => {
    if (err) {
      console.error("Error adding supplier:", err);
      return res.status(500).json({ message: "Failed to add supplier." });
    }
    res.status(201).json({ message: "Supplier added successfully.", supplierId: result.insertId });
  });
});


// GET API for fetching suppliers
app.get("/api/suppliers", (req, res) => {
    const query = "SELECT suppid, supplierName, contact, email, address FROM suppliers";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching suppliers: ", err);
        return res.status(500).send("Error fetching suppliers.");
      }
      res.json(results);
    });
  });


  // POST API to add a brand
app.post("/api/brands", (req, res) => {
    const { brandName, description } = req.body;
  
    // Validate input
    if (!brandName || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }
  
    // Insert brand into the database
    const query = "INSERT INTO brands (brandName, description) VALUES (?, ?)";
    db.query(query, [brandName, description], (err, result) => {
      if (err) {
        console.error("Error adding brand:", err);
        return res.status(500).json({ message: "Failed to add brand." });
      }
      res.status(201).json({ message: "Brand added successfully.", brandId: result.insertId });
    });
  });

  // GET API to fetch all brands
app.get("/api/brands", (req, res) => {
    const query = "SELECT * FROM brands";
    db.query(query, (err, result) => {
      if (err) {
        console.error("Error fetching brands:", err);
        return res.status(500).json({ message: "Failed to fetch brands." });
      }
      res.status(200).json(result); // Return the brands as a JSON response
    });
  });

  // POST route to add a new product
  app.post("/api/products", (req, res) => {
    const { productName, description } = req.body;
  
    // Validate the request body
    if (!productName || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }
  
    const query = "INSERT INTO products (productName, description) VALUES (?, ?)";
    const values = [productName, description];
  
    db.query(query, values, (err, result) => {
      if (err) {
        console.error("Error inserting data into the database:", err);
        return res.status(500).json({ message: "Database error." });
      }
      res.status(201).json({ message: "Product added successfully.", productId: result.insertId });
    });
  });
// Endpoint to retrieve products
app.get("/api/products", (req, res) => {
    const query = "SELECT * FROM products";
    db.query(query, (err, results) => {
      if (err) {
        console.error("Error fetching products:", err);
        return res.status(500).json({ message: "Failed to fetch products." });
      }
      res.status(200).json(results);
    });
  });
  
 
// API endpoint to handle adding a purchase
app.post('/api/purchases', (req, res) => {
  const {
    productName,
    quantity,
    units,
    price,
    supplierName,
    brandName,
    billNumber,
    billDate,
  } = req.body;

  if (
    !productName ||
    !quantity ||
    !units ||
    !price ||
    !supplierName ||
    !brandName ||
    !billNumber ||
    !billDate
  ) {
    res.status(400).send({ message: 'All fields are required.' });
    return;
  }

  const sql = `
    INSERT INTO purchases 
    (product_name, quantity, units, price, supplier_name, brand_name, bill_number, bill_date)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    sql,
    [productName, quantity, units, price, supplierName, brandName, billNumber, billDate],
    (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        res.status(500).send('Error saving purchase data.');
        return;
      }
      res.status(201).send({ message: 'Purchase added successfully!', id: result.insertId });
    }
  );
});


// GET API to fetch purchase data
app.get('/api/purchases', (req, res) => {
  const sql = `SELECT 
                id AS sNo, 
                product_name AS productName, 
                quantity, 
                units, 
                price, 
                supplier_name AS supplierName, 
                brand_name AS brandName 
               FROM purchases`;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching data:', err);
      res.status(500).send({ message: 'Error fetching purchase data.' });
      return;
    }

    res.status(200).send(results);
  });
});

app.post('/api/stockin', (req, res) => {
  const {
    productName,
    quantity,
    units,
    
    supplierName,
    brandName,
    billNumber,
    
  } = req.body;

  // Ensure all fields are present before inserting
  if (!productName || !quantity || !units || !supplierName || !brandName || !billNumber) {
    console.error('Missing fields:', req.body); // Log the request body for debugging
    return res.status(400).send({ message: 'All fields are required' });
  }

  // SQL query to insert data into the stockledger table
  const sql = `
    INSERT INTO stockledger (
      site_name, 
      site_code, 
      date, 
      time, 
      transaction_type, 
      supplier, 
      supplierid, 
      receiver, 
      product, 
      product_id, 
      brand, 
      brand_id, 
      units, 
      quantity_in, 
      quantity_out, 
      available_quantity, 
      invoice_no, 
      tran_id
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const siteName = "Default Site";
  const siteCode = "S001";
  const date = new Date().toISOString().split('T')[0]; // Current date
  const time = new Date().toISOString().split('T')[1].slice(0, 8); // Current time
  const transactionType = "StockIn";
  const supplierId = 1;
  const receiver = "Receiver Name";
  const productId = 1;
  const brandId = 1;
  const quantityOut = 0;
  const availableQuantity = quantity;
  const tranId = "TRAN001";

  const values = [
    siteName,
    siteCode,
    date,
    time,
    transactionType,
    supplierName,
    supplierId,
    receiver,
    productName,
    productId,
    brandName,
    brandId,
    units,
    quantity,
    quantityOut,
    availableQuantity,
    billNumber,
    tranId,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error('Error inserting data:', err); // Log error for debugging
      return res.status(500).send({ message: 'Error saving stock-in data' });
    }
    res.status(201).send({ message: 'Stock-in record added successfully!', id: result.insertId });
  });
});

  

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

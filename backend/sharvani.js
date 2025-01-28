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
app.post("/stock-in", (req, res) => {
  const {
      site_name,
      site_code,
      dateTime,
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
          dateTime,
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
app.post("/stock-out", (req, res) => {
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
          destinationSite,
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

app.post("/stock-consumed", (req, res) => {
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



  //Get all sites (GET)
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

// POST API to add a user
app.post("/users", (req, res) => {
  const { name, mobile, email, password, role } = req.body;
  const sql = "INSERT INTO users (name, mobile, email, password, role) VALUES (?, ?, ?, ?,?)";
  db.query(sql, [name, mobile, email,password, role], (err, result) => {
    if (err) {
      console.error("Error inserting user:", err);
      res.status(500).send("Failed to add user.");
    } else {
      res.status(201).send("User added successfully.");
    }
  });
});
app.get('/users', (req, res) => {
  const query = 'SELECT * FROM users';
  db.query(query, (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});


// POST API to add a new site
app.post('/sites', (req, res) => {
  const { siteCode, siteName, location, city, state, siteManager, managerMobile, userId } = req.body;

  // Validate the request body
  if (
    !siteCode ||
    !siteName ||
    !location ||
    !city ||
    !state ||
    !siteManager ||
    !managerMobile ||
    !userId
  ) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Insert into MySQL database
  const query = `
    INSERT INTO sites (siteCode, siteName, location, city, state, siteManager, managerMobile, userId)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [siteCode, siteName, location, city, state, siteManager, managerMobile, userId],
    (err, result) => {
      if (err) {
        console.error('Error inserting data:', err);
        return res.status(500).json({ message: 'Failed to add site' });
      }

      res.status(201).json({
        message: 'Site added successfully',
        siteId: result.insertId,
      });
    }
  );
});


  // Login API
app.post("/api/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  const query = "SELECT id, email, name, role FROM users WHERE email = ? AND password = ?";
  db.query(query, [email, password], (err, results) => {
    if (err) {
      console.error("Error querying the database:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.length > 0) {
      // User found
      const user = results[0];
      res.status(200).json({
        message: "Login successful",
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      });
    } else {
      // User not found
      res.status(401).json({ message: "Invalid email or password" });
    }
  });
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

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
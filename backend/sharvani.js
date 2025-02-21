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

app.get("/stock-out", (req, res) => {
  const { userid } = req.query; // Get userid from request query

  if (!userid) {
    return res.status(400).json({ message: "User ID is required" });
  }

  // Base SQL query with condition
  let sqlQuery = "SELECT * FROM stockledger WHERE transaction_type = 'Stock Out' AND userid = ?";
  let queryParams = [userid];

  db.query(sqlQuery, queryParams, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ message: "Error fetching data" });
    } else {
      res.status(200).json(results);
    }
  });
});


const multer = require("multer");
const path = require("path");

// Configure Multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

app.post("/stock-out", upload.single("attachment"), (req, res) => {
  const {
    dateTime,
    supplierName,
    supplier_id,
    destinationSite,
    productName,
    product_id,
    units,
    description,
    quantity,
    quantity_out,
    available_quantity,
    billNumber,
    tran_id,
    userId,
    siteManager,
    siteCode,
    siteName,
    siteId,
  } = req.body;

  const attachment = req.file ? req.file.filename : null; // Store file path or filename
  const transaction_type = "Stock Out";
  const time = new Date(dateTime).toLocaleTimeString();

  const query = `
    INSERT INTO stockledger (
      site_name, site_code, date, time, transaction_type, supplier,
      supplier_id, receiver, product, product_id,
      units, attachment, description, quantity_in, quantity_out, 
      available_quantity, invoice_no, tran_id, userid, sitemanager, siteid
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      siteName,
      siteCode,
      dateTime,
      time,
      transaction_type,
      supplierName,
      supplier_id,
      destinationSite,
      productName,
      product_id,
      units,
      attachment,
      description,
      quantity,
      quantity_out,
      available_quantity,
      billNumber,
      tran_id,
      userId,
      siteManager,
      siteId,
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


// POST Route with File Upload
app.post("/stock-consumed", upload.single("attachment"), (req, res) => {
  console.log("Received file:", req.file);  // Debugging log
  console.log("Received body:", req.body);  // Debugging log

  const {
    productName,
    quantity,
    units,
    description,
    dateTime,
    userId,
    siteManager,
    siteCode,
    siteName,
    siteId,
  } = req.body;

  const transaction_type = "Consumption"; 
  const supplierName = "N/A"; 
  const supplier_id = 0; 
  const destinationSite = siteName; 
  const product_id = req.body.product_id || null; // Ensure product_id is dynamic
  const quantity_in = 0; 
  const available_quantity = req.body.available_quantity || 0; // Avoid hardcoding
  const tran_id = Date.now(); 

  // ✅ Corrected file upload handling
  const attachment = req.file ? `/uploads/${req.file.filename}` : null;
  console.log("Attachment path:", attachment);

  const query = `
    INSERT INTO stockledger (
      site_name, site_code, date, transaction_type, supplier,
      supplier_id, receiver, product, product_id,
      units, attachment, description, quantity_in, quantity_out,
      available_quantity, tran_id, userid, sitemanager, siteid
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    query,
    [
      siteName,
      siteCode,
      dateTime,
      transaction_type,
      supplierName,
      supplier_id,
      destinationSite,
      productName,
      product_id,
      units,
      attachment,
      description,
      quantity_in,
      quantity,
      available_quantity,
      tran_id,
      userId,
      siteManager,
      siteId,
    ],
    (err, result) => {
      if (err) {
        console.error("Error inserting data:", err);
        return res.status(500).json({ message: "Failed to add stock" });
      }
      return res.status(200).json({ message: "Stock added successfully", attachment });
    }
  );
});

app.get("/stock-consumed", (req, res) => {
  const { userid } = req.query; // Get userid from request query

  if (!userid) {
    return res.status(400).json({ message: "User ID is required" });
  }

  // Base SQL query with condition
  let sqlQuery = "SELECT * FROM stockledger WHERE transaction_type = 'Consumption' AND userid = ?";
  let queryParams = [userid];

  db.query(sqlQuery, queryParams, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ message: "Error fetching data" });
    } else {
      res.status(200).json(results);
    }
  });
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


//Get all sites (GET)
app.get('/sites', (req, res) => {
  const query = 'SELECT * FROM sites';

  db.query(query, (err, results) => {
    if (err) {
      console.error("Database Error:", err);
      return res.status(500).send('Error fetching sites');
    }
    
    console.log("Fetched Sites from DB:", results); // Debugging log
    res.send(results);
  });
});


app.post("/stock-in", (req, res) => {
  const {
    dateTime,
    supplierName,
    supplier_id,
    receiver,
    productName,
    product_id,
    name,
    quantity,
    quantity_out,
    available_quantity,
    billNumber,
    tran_id,
    userId,
    siteManager,
    siteCode,
    siteName,
    siteId,
    description,
    price,
    total_price,
  } = req.body;

  const transaction_type = "Purchase";  // Example (could be dynamic if needed)
  const time = new Date(dateTime).toLocaleTimeString(); // Format time from dateTime

  // Insert data into the database using the query
  const query = `
      INSERT INTO stockledger (
          site_name, site_code, date, time, transaction_type, supplier,
          supplier_id, receiver, product, product_id, 
          units, quantity_in, quantity_out, available_quantity, invoice_no, tran_id,userid,sitemanager,siteid, description,price,total_price
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?,?,?,?)
  `;

  db.query(
    query,
    [
      siteName,
      siteCode,
      dateTime,
      time,
      transaction_type,
      supplierName,
      supplier_id,
      receiver,
      productName,
      product_id,
      name,
      quantity,
      quantity_out,
      available_quantity,
      billNumber,
      tran_id,
      userId,
      siteManager,
      siteId,
      description,
      price,
      total_price

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

app.get("/stock-in", (req, res) => {
  const { userid } = req.query; // Get userid from request query

  if (!userid) {
    return res.status(400).json({ message: "User ID is required" });
  }

  // Base SQL query with condition
  let sqlQuery = "SELECT * FROM stockledger WHERE transaction_type = 'Purchase' AND userid = ?";
  let queryParams = [userid];

  db.query(sqlQuery, queryParams, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      res.status(500).json({ message: "Error fetching data" });
    } else {
      res.status(200).json(results);
    }
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


// GET API to fetch sites by userId
// Get a specific site by siteId (GET)
app.get('/sites/:siteId', (req, res) => {
  const { siteId } = req.params; // Extract siteId from URL

  const query = 'SELECT * FROM sites WHERE id = ?';

  db.query(query, [siteId], (err, results) => {
    if (err) {
      console.error("Error fetching site:", err);
      return res.status(500).json({ message: "Failed to fetch site details" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Site not found" });
    }

    res.status(200).json(results[0]); // Return single site details
  });
});


app.get("/allocated", (req, res) => {
  const sqlQuery = "SELECT * FROM stockledger WHERE transaction_type = 'Stock Out'";

  db.query(sqlQuery, (err, results) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).json({ message: "Error fetching data" });
    }
    res.status(200).json(results);
  });
});





// API to Fetch Products (Both Purchased & Allocated)
app.get("/fetch-all-products", (req, res) => {
  const { userId, siteName } = req.query;

  if (!userId || !siteName) {
    return res.status(400).json({ error: "Missing userId or siteName" });
  }

  const query = `
    SELECT product, GROUP_CONCAT(DISTINCT units) AS units
    FROM stockledger
    WHERE (siteId = ? AND transaction_type = 'Purchase') 
       OR (receiver = ? AND transaction_type = 'Stock Out')
    GROUP BY product
  `;

  db.query(query, [userId, siteName], (err, results) => {
    if (err) {
      console.error(" Database Error:", err);
      return res.status(500).json({ error: "Internal server error" });
    }

    console.log(" Fetched Products:", results);
    res.json(results);
  });
});


// PUT API to Update Stock-In Data (Without Attachment)
app.put('/update-stock-in/:id', (req, res) => {
  const { id } = req.params;
  const {
      billNumber,
      productName,
      supplierName,
      unitName,
      price,
      quantity,
      total_price,
      description,
  } = req.body;

  // Update Query
  const sql = `UPDATE stockledger 
               SET invoice_no = ?, product = ?, supplier = ?, units = ?, price = ?, quantity_in = ?, total_price = ?, description = ?
               WHERE id = ?`;

  db.query(sql, [billNumber, productName, supplierName, unitName, price, quantity, total_price, description, id], (err, result) => {
      if (err) {
          console.error('Error updating stock-in:', err);
          return res.status(500).json({ success: false, message: 'Failed to update stock-in' });
      }
      res.json({ success: true, message: 'Stock-in updated successfully' });
  });
});

app.delete('/stock-in/:id', (req, res) => {
  const id = req.params.id; // Use "id" as per your table structure

  if (!id) {
    return res.status(400).json({ success: false, message: 'Invalid stock ID' });
  }

  const sql = 'DELETE FROM stockledger WHERE id = ?';

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting stock record:', err);
      return res.status(500).json({ success: false, message: 'Failed to delete stock record' });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: 'Stock record not found' });
    }

    res.json({ success: true, message: 'Stock record deleted successfully' });
  });
});


// API route with file upload
app.put("/stock-out/:id", upload.single("attachment"), (req, res) => {
  const stockId = req.params.id;
  const {
    date, // Use 'date' instead of 'dateTime'
    destinationSite,
    productName,
    quantity_out,
    units,
    description,
  } = req.body;

  const attachment = req.file ? req.file.filename : null; // Save new file or keep null

  console.log("Updating stock ID:", stockId);
  console.log("Received Data:", req.body);
  console.log("Uploaded File:", req.file);

  if (!stockId) {
    return res.status(400).json({ success: false, message: "Stock ID is required" });
  }

  // First, get the existing record to check if there's already an attachment
  const getExistingSql = "SELECT attachment FROM stockledger WHERE id = ?";
  db.query(getExistingSql, [stockId], (err, results) => {
    if (err) {
      console.error("Error fetching existing stock record:", err);
      return res.status(500).json({ success: false, message: "Database error occurred" });
    }

    if (results.length === 0) {
      return res.status(404).json({ success: false, message: "Stock record not found" });
    }

    const existingAttachment = results[0].attachment;
    const finalAttachment = attachment || existingAttachment; // Keep old file if no new upload

    const updateSql = `
      UPDATE stockledger 
      SET 
        date = ?,  
        receiver = ?, 
        product = ?, 
        quantity_out = ?, 
        units = ?, 
        description = ?, 
        attachment = ?
      WHERE id = ?`;

    const values = [date, destinationSite, productName, quantity_out, units, description, finalAttachment, stockId];

    db.query(updateSql, values, (updateErr, result) => {
      if (updateErr) {
        console.error("MySQL Error:", updateErr);
        return res.status(500).json({ success: false, message: "Database error occurred" });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ success: false, message: "Stock record not found" });
      }

      res.status(200).json({ success: true, message: "Stock updated successfully", attachment: finalAttachment });
    });
  });
});
 
// DELETE Stock-Out Record
app.delete("/stock-out/:id", (req, res) => {
  const stockId = req.params.id;

  if (!stockId) {
    return res.status(400).json({ success: false, message: "Stock ID is required" });
  }

  const sql = "DELETE FROM stockledger WHERE id = ?";
  
  db.query(sql, [stockId], (err, result) => {
    if (err) {
      console.error("MySQL Error:", err);
      return res.status(500).json({ success: false, message: "Database error occurred" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ success: false, message: "Stock record not found" });
    }

    res.status(200).json({ success: true, message: "Stock record deleted successfully" });
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
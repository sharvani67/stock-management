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

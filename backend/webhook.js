// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const mysql = require('mysql');  // Import MySQL library
const { channel } = require('diagnostics_channel');

const nodemailer = require('nodemailer'); // Import nodemailer for sending emails

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // Allow all origins (for testing purposes)
    methods: ["GET", "POST"],
  },
  transports: ['websocket', 'polling'], // Allow both WebSocket and polling
});

const PORT = 4000;

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // Replace with your DB password
  database: 'funstay', // Replace with your DB name
});


// const db = mysql.createConnection({
//   host: 'localhost', // Your database host
//   user: 'nodeuser', // Your database user
//   password: 'Root@1234', // Your database password
//   database: 'funstay_db', // Your database name
// });
// Connect to the database
db.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to the database.');
});

let enquiries = [];


// Route to handle the webhook and emit the new enquiry
app.post('/api/webhook', (req, res) => {
  const { YourName, yourEmail, Phone, subject, message, LeadSource, LeadCampaign, Channel,Destination } = req.body;
  console.log('Received webhook with data:', req.body);

  const name = YourName;
  const email = yourEmail;
  const phone_number = Phone;
  const lead_type = LeadCampaign;
  const sources = LeadSource;
  const description = `subject: ${subject} message: ${message}`;
  const primarySource = "New";
  const secondarysource = "Yet to Contact";
  const status = "lead";
  const channel = Channel;
  const destination = Destination;

  // Check if the customer already exists
  const checkCustomerQuery = 'SELECT id, customer_status FROM customers WHERE phone_number = ?';

  db.query(checkCustomerQuery, [phone_number], (err, customerResults) => {
    if (err) {
      console.error('Error checking customer:', err);
      return res.status(500).json({ message: 'Error checking customer' });
    }

    let customerId;
    let customerStatus = "new"; // Default to new

    if (customerResults.length > 0) {
      // Customer exists
      customerId = customerResults[0].id;
      customerStatus = customerResults[0].customer_status; // Get the existing status
      insertLead(customerId, customerStatus); // Insert lead after getting customer ID
    } else {
      // Customer does not exist, insert new customer
      const insertCustomerQuery = `
        INSERT INTO customers (name, email, phone_number, customer_status)
        VALUES (?, ?, ?, ?)
      `;
      const customerValues = [name, email, phone_number, "new"];

      db.query(insertCustomerQuery, customerValues, (err, insertResult) => {
        if (err) {
          console.error('Error inserting customer:', err);
          return res.status(500).json({ message: 'Error saving customer' });
        }
        customerId = insertResult.insertId; // Get the new customer ID
        insertLead(customerId, customerStatus); // Insert lead after new customer is added
      });
    }
  });

  // Function to insert lead after customer ID is available
  function insertLead(customerId, customerStatus) {
    const query = `
      INSERT INTO addleads (
        lead_type, name, email, phone_number, sources,
        another_name, another_email,
        another_phone_number, corporate_id, description, status, channel, customerid, customer_status,destination
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?)
    `;

    const newEnquiry = { name, email, phone_number, subject, message, lead_type, sources, description, status, primarySource, secondarysource, channel, customerId };
    const values = [
      lead_type,
      name,
      email,
      phone_number,
      sources,
      "", // another_name
      "", // another_email
      "", // another_phone_number
      "", // corporate_id
      description,
      status,
      channel,
      customerId, // Store customer ID
      customerStatus,
      destination, // Store customer status
    ];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error inserting enquiry:', err);
        return res.status(500).json({ message: 'Error saving enquiry' });
      }

      // Emit new enquiry to all connected clients
      io.emit('newEnquiry', newEnquiry);
      res.status(200).json({ message: 'Enquiry received and saved successfully!' });
    });
  }
});



// Route to fetch all enquiries
app.get('/api/enquiries', (req, res) => {
  const query = 'SELECT * FROM addleads ORDER BY created_at DESC';
  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching enquiries:', err);
      return res.status(500).json({ message: 'Error fetching enquiries' });
    }
    res.json(results);
  });
});

// WebSocket connection
io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});


// Email Configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "uppalahemanth4@gmail.com", // Your email
    pass: "oimoftsgtwradkux", // Use App Password if 2FA is enabled
  },
});

// Function to send an email when the server stops
const sendServerDownEmail = async (reason) => {
  try {
    await transporter.sendMail({
      from: '"Server Monitor" <uppalahemanth4@gmail.com>',
      to: "uppalahemanth4@gmail.com", // Admin email
      subject: "🚨 Server Down Alert!",
      text: `webhook.js server at http://localhost:${PORT} has stopped.\nReason: ${reason}`,
    });
    console.log("Server down notification sent via email.");
  } catch (error) {
    console.error("Failed to send email:", error);
  }
};

// Handle Server Exit
const handleExit = async (reason) => {
  console.log(`Server is stopping... Reason: ${reason}`);
  await sendServerDownEmail(reason);
  process.exit(1);
};



// Handle manual shutdown (Ctrl+C)
process.on("SIGINT", () => handleExit("Manual shutdown (Ctrl+C)"));

// Handle system termination (e.g., system shutdown, PM2 stop)
process.on("SIGTERM", () => handleExit("System termination"));

// Handle unexpected errors
process.on("uncaughtException", async (err) => {
  console.error("Uncaught Exception:", err);
  await sendServerDownEmail(`Uncaught Exception: ${err.message}`);
  process.exit(1);
});


// Start server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

require("dotenv").config(); // Load environment variables from .env file

const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection setup using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST || "127.0.0.1",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "hospital_dbms",
  port: process.env.DB_PORT || 3307,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

// Post Patient Data
app.post("/submit/patient", (req, res) => {
  const { name, age, gender, contact } = req.body;

  // Basic validation
  if (!name || !age || !gender || !contact) {
    return res.status(400).send("All fields are required.");
  }

  const query =
    "INSERT INTO patients (name, age, gender, contact) VALUES (?, ?, ?, ?)";
  db.query(query, [name, age, gender, contact], (err, results) => {
    if (err) {
      console.error("Error during patient submission:", err); // Log error for debugging
      return res.status(500).send("Database error");
    }
    res.status(200).send("Patient data successfully inserted");
  });
});

// Post Doctor Data
app.post("/submit/doctor", (req, res) => {
  const { name, specialty, phone } = req.body;

  // Basic validation
  if (!name || !specialty || !phone) {
    return res.status(400).send("All fields are required.");
  }

  const query =
    "INSERT INTO doctors (name, specialty, phone) VALUES (?, ?, ?)";
  db.query(query, [name, specialty, phone], (err, results) => {
    if (err) {
      return res.status(500).send("Database error");
    }
    res.status(200).send("Doctor data successfully inserted");
  });
});

// Get Doctor Data
app.get("/get/doctors", (req, res) => {
  const query = "SELECT * FROM doctors";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send("Database error");
    }
    res.status(200).json(results);
  });
});

// Get Doctor by ID
app.get("/get/doctor/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM doctors WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).send("Database error");
    }
    if (results.length === 0) {
      return res.status(404).send("Doctor not found");
    }
    res.status(200).json(results[0]);
  });
});

// Post Appointment Data
app.post("/submit/appointment", (req, res) => {
  const { patient_id, doctor_id, appointment_date } = req.body;

  if (!patient_id || !doctor_id || !appointment_date) {
    return res.status(400).send("All fields are required.");
  }

  const query =
    "INSERT INTO appointments (patient_id, doctor_id, appointment_date) VALUES (?, ?, ?)";
  db.query(query, [patient_id, doctor_id, appointment_date], (err, results) => {
    if (err) {
      console.error("Error during appointment submission:", err);
      return res.status(500).send("Database error");
    }
    res.status(200).send("Appointment data successfully inserted");
  });
});

// Post Prescription Data
app.post("/submit/prescription", (req, res) => {
  const { patient_id, doctor_id, medication, date_prescribed } = req.body;

  if (!patient_id || !doctor_id || !medication || !date_prescribed) {
    return res.status(400).send("All fields are required.");
  }

  const query =
    "INSERT INTO prescriptions (patient_id, doctor_id, medication, date_prescribed) VALUES (?, ?, ?, ?)";
  db.query(
    query,
    [patient_id, doctor_id, medication, date_prescribed],
    (err, results) => {
      if (err) {
        console.error("Error during prescription submission:", err);
        return res.status(500).send("Database error");
      }
      res.status(200).send("Prescription data successfully inserted");
    }
  );
});

// Post Department Data
app.post("/submit/department", (req, res) => {
  const { name, location } = req.body;

  if (!name || !location) {
    return res.status(400).send("All fields are required.");
  }

  const query = "INSERT INTO departments (name, location) VALUES (?, ?)";
  db.query(query, [name, location], (err, results) => {
    if (err) {
      console.error("Error during department submission:", err);
      return res.status(500).send("Database error");
    }
    res.status(200).send("Department data successfully inserted");
  });
});

// Get Patient Data
app.get("/get/patients", (req, res) => {
  const query = "SELECT * FROM patients";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).send("Database error");
    }
    res.status(200).json(results);
  });
});

// Get Patient by ID
app.get("/get/patient/:id", (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM patients WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).send("Database error");
    }
    if (results.length === 0) {
      return res.status(404).send("Patient not found");
    }
    res.status(200).json(results[0]);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

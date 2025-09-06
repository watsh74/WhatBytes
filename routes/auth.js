const express = require("express");
const router = express.Router();
const pool = require("../db");


router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    
    await pool.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
      [name, email, password]
    );

    res.json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in /register:", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
});

// Login route
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email = $1 AND password = $2",
      [email, password]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user: result.rows[0] });
  } catch (error) {
    console.error("Error in /login:", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
});

module.exports = router;

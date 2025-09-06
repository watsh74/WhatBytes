const express = require("express");
const router = express.Router();
const pool = require("../db");


router.post("/", async (req, res) => {
  const { name, age } = req.body;
  try {
    await pool.query("INSERT INTO patients(name,age) VALUES($1,$2)", [name, age]);
    res.json({ msg: "Patient added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM patients");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
// I have taken the help from Chatgpt.
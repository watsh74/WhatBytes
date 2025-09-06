const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/", async (req, res) => {
  const { name, specialty } = req.body;
  try {
    await pool.query("INSERT INTO doctors(name,specialty) VALUES($1,$2)", [
      name,
      specialty,
    ]);
    res.json({ msg: "Doctor added" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM doctors");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

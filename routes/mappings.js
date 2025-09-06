const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/", async (req, res) => {
  const { patient_id, doctor_id } = req.body;
  try {
    await pool.query("INSERT INTO mappings(patient_id,doctor_id) VALUES($1,$2)", [
      patient_id,
      doctor_id,
    ]);
    res.json({ msg: "Doctor assigned to patient" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM mappings");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

const express = require("express");
const client = require("../config/database");

const router = express.Router();

// Registrar propiedad
router.post("/properties", async (req, res) => {
  try {
    const { address, property_name, property_type, owner_email, apartment_number, RNT, check_in_date, check_out_date, status } = req.body;

    if (!address || !property_name || !property_type || !owner_email || !check_in_date || !check_out_date) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    await client.execute({
      sql: `
        INSERT INTO properties (address, property_name, property_type, owner_email, apartment_number, RNT, check_in_date, check_out_date, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      args: [address, property_name, property_type, owner_email, apartment_number, RNT, check_in_date, check_out_date, status],
    });

    res.json({ message: "Property registered successfully" });
  } catch (error) {
    console.error("Database error:", error);
    res.status(500).json({ error: "Database error" });
  }
});

router.post("/show-properties", async (req, res) => {

  try {
  } catch (error) {
    
  }

  
})

module.exports = router;

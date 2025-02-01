const express = require("express");
const client = require("../config/database");

const router = express.Router();

// Validar usuario por email, ID o teléfono
router.post("/validate-user", async (req, res) => {
  const { email, id_number, phone_number } = req.body;

  try {
    const result = await client.execute({
      sql: `SELECT * FROM owners WHERE email = ? OR id_number = ? OR phone_number = ?`,
      args: [email, id_number, phone_number],
    });

    if (result.rows.length > 0) {
      return res.status(400).json({ message: "Usuario ya registrado." });
    }
    res.status(200).json({ message: "Usuario disponible para registro." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al consultar la base de datos." });
  }
});

// Registrar propietario
router.post("/register-owner", async (req, res) => {
  const { first_name, last_name, age, id_number, email, phone_number, password } = req.body;

  try {
    const result = await client.execute({
      sql: `
        INSERT INTO owners 
        (first_name, last_name, age, id_number, email, phone_number, password)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `,
      args: [first_name, last_name, age, id_number, email, phone_number, password],
    });

    res.status(201).json({
      message: "Propietario registrado exitosamente.",
      id: result.lastInsertRowid.toString(),
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al registrar el propietario." });
  }
});

// Inicio de sesión
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await client.execute({
      sql: `SELECT * FROM owners WHERE email = ? AND password = ?`,
      args: [email, password],
    });

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Credenciales incorrectas." });
    }

    const owner = result.rows[0];

    res.status(200).json({
      message: "Inicio de sesión exitoso.",
      ownerId: owner.id.toString(),
      ownerEmail: owner.email,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al consultar la base de datos." });
  }
});

module.exports = router;

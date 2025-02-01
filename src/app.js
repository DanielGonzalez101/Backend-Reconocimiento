const express = require("express");
const cors = require("cors");
const ownerRoutes = require("./routes/ownerRoutes");
const propertyRoutes = require("./routes/propertyRoutes");

const app = express();

app.use(express.json());
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

// Usar rutas separadas
app.use("/api/owners", ownerRoutes);
app.use("/api/properties", propertyRoutes);

module.exports = app

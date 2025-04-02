const express = require("express");
const app = express();
const cors = require("cors");

const userRoutes = require("./routes/user_routes");
const authRoutes = require("./routes/auth_routes");


// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

module.exports = app;
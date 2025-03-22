const express = require("express");
const app = express();
const cors = require("cors");

const userRoutes = require("./routes/user_routes");


// Middleware
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);

module.exports = app;
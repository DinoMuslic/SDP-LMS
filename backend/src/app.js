const express = require("express");
const app = express();
const cors = require("cors");

const userRoutes = require("./routes/user_routes");
const authRoutes = require("./routes/auth_routes");
const adminRoutes = require("./routes/admin_routes");
const librarianRoutes = require("./routes/librarian_routes");

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/librarian", librarianRoutes);

module.exports = app;

const express = require("express");
const app = express();
const cors = require("cors");

const userRoutes = require("./routes/user_routes");
const authorRoutes = require("./routes/author_routes");
const bookRoutes = require("./routes/book_routes");
const authRoutes = require("./routes/auth_routes");
const adminRoutes = require("./routes/admin_routes");
const librarianRoutes = require("./routes/librarian_routes");
const borrowingRoutes = require("./routes/borrowing_routes");
const publisherRoutes = require("./routes/publisher_routes");

app.use(cors({
    origin: "https://sdp-lms-x5tpn.ondigitalocean.app/"
}));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend API is running");
});

app.use("/api/users", userRoutes);
app.use("/api/authors", authorRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/librarian", librarianRoutes);
app.use("/api/borrowings", borrowingRoutes);
app.use("/api/publishers", publisherRoutes);

module.exports = app;

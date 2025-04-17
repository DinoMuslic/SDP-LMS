const express = require("express");
const { verifyToken, isLibrarianOrAdmin } = require("../middleware/middleware");

const router = express.Router();

router.get("/", verifyToken, isLibrarianOrAdmin, (req, res) => {
    res.json({ message: "Welcome, Librarian!" });
});

module.exports = router;

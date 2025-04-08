const express = require("express");
const { verifyToken, isAdmin } = require("../middleware/middleware");

const router = express.Router();

router.get("/", verifyToken, isAdmin, (req, res) => {
    res.json({ message: "Welcome, Admin!" });
});

module.exports = router;

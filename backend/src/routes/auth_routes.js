const express = require("express");
const { registerUser } = require("../controllers/auth_controller");

const router = express.Router();

router.post("/register", registerUser);

module.exports = router;
const express = require("express");
const { getUsers, getUser } = require("../controllers/user_controller");
const { verifyToken, isAdmin } = require("../middleware/middleware");

const router = express.Router();

router.get("/", verifyToken, isAdmin, getUsers);
router.get("/:id", verifyToken, isAdmin, getUser);

module.exports = router;
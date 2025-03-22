const express = require("express");
const { getUsers, getUser } = require("../controllers/user_controller");

const router = express.Router();

router.get("/", getUsers);
router.get("/:id", getUser);

module.exports = router;
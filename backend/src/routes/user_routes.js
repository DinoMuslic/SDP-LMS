const express = require("express");
const { getUsers, getUser, updateUser, deleteUser } = require("../controllers/user_controller");
const { verifyToken, isAdmin } = require("../middleware/middleware");

const router = express.Router();

router.get("/", /*verifyToken, isAdmin,*/ getUsers);
router.get("/:id", /*verifyToken, isAdmin,*/ getUser);
router.put("/:id", updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;
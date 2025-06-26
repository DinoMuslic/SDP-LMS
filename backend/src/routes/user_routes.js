const express = require("express");
const {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
  getUsersInfo,
  changePassword,
} = require("../controllers/user_controller");
const { verifyToken, isAdmin } = require("../middleware/middleware");

const router = express.Router();

router.get("/", /*verifyToken, isAdmin,*/ getUsers);
router.get("/students", getUsersInfo);
router.get("/:id", /*verifyToken, isAdmin,*/ getUser);
router.post("/add", addUser);
router.post("/change-password", changePassword);
router.put("/:id", updateUser);
router.delete("/delete/:id", deleteUser);

module.exports = router;

const express = require("express");
const { addBorrowing } = require("../controllers/borrow_controller");


const router = express.Router();

router.post("/add", addBorrowing);

module.exports = router;
const express = require("express");
const { addBorrowing, returnBook } = require("../controllers/borrow_controller");


const router = express.Router();

router.post("/add", addBorrowing);
router.post("/return", returnBook);

module.exports = router;
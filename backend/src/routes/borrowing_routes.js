const express = require("express");
const { addBorrowing, borrowingInfo ,returnBook } = require("../controllers/borrow_controller");


const router = express.Router();

router.get("/all", borrowingInfo);
router.post("/add", addBorrowing);
router.post("/return", returnBook);

module.exports = router;
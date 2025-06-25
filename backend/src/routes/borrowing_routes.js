const express = require("express");
const { addBorrowing, borrowingInfo, updateLateBorrowings ,returnBook } = require("../controllers/borrow_controller");


const router = express.Router();

router.get("/all", borrowingInfo);
router.patch("/update-late", updateLateBorrowings);
router.post("/add", addBorrowing);
router.post("/return", returnBook);

module.exports = router;
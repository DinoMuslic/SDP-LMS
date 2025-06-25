const express = require("express");
const { addBorrowing, borrowingInfo, updateLateBorrowings, returnBook, calculateFines } = require("../controllers/borrow_controller");


const router = express.Router();

router.get("/all", borrowingInfo);
router.patch("/update-late", updateLateBorrowings);
router.post("/add", addBorrowing);
router.post("/return", returnBook);
router.get("/calculate-fines/:id", calculateFines);

module.exports = router;
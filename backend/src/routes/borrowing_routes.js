const express = require("express");
const { addBorrowing, borrowingInfo, updateLateBorrowings, returnBook, calculateFines, calculateAllFines } = require("../controllers/borrow_controller");


const router = express.Router();

router.get("/all", borrowingInfo);
router.patch("/update-late", updateLateBorrowings);
router.post("/add", addBorrowing);
router.post("/return", returnBook);
router.get("/calculate-fines/:id", calculateFines);
router.get("/total-fines/", calculateAllFines);

module.exports = router;
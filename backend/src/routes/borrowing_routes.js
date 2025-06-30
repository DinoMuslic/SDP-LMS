const express = require("express");
const { addBorrowing, borrowingInfo, updateLateBorrowings, returnBook, calculateFines, calculateFinesProfile, calculateAllFines } = require("../controllers/borrow_controller");


const router = express.Router();

router.get("/all", borrowingInfo);
router.patch("/update-late", updateLateBorrowings);
router.post("/add", addBorrowing);
router.post("/return", returnBook);
router.get("/calculate-fines/:id", calculateFines);
router.get("/calculate-fines-profile/:id", calculateFinesProfile);
router.get("/total-fines/", calculateAllFines);

module.exports = router;
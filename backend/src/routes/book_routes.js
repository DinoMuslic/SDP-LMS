const express = require("express");
const { getBooks, getBook, getTopBorrowedBooks, addBook, updateBook, deleteBook, getBooksInfo, checkAvailability } = require("../controllers/book_controller");


const router = express.Router();

router.get("/all", getBooks);
router.get("/top-borrowed", getTopBorrowedBooks);
router.get("/info/all", getBooksInfo);
router.get("/is-available/:title", checkAvailability);
router.get("/:id", getBook);
router.post("/add", addBook);
router.put("/update/:id", updateBook);
router.delete("/delete/:id", deleteBook);

module.exports = router;
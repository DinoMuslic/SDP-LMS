const express = require("express");
const { getBooks, getBook, addBook, updateBook, deleteBook } = require("../controllers/book_controller");


const router = express.Router();

router.get("/all", getBooks);
router.get("/:id", getBook);
router.post("/add", addBook);
router.put("/update/:id", updateBook);
router.delete("/delete/:id", deleteBook);

module.exports = router;
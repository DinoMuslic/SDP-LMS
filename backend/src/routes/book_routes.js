const express = require("express");
const upload = require("../middleware/upload");
const { getBooks, getBook, getTopBorrowedBooks, addBook, updateBook, deleteBook, getBooksInfo, checkAvailability, getBookImage } = require("../controllers/book_controller");


const router = express.Router();

router.get("/all", getBooks);
router.get("/top-borrowed", getTopBorrowedBooks);
router.get("/info/all", getBooksInfo);
router.get("/is-available/:title", checkAvailability);
router.get("/:id", getBook);
router.post("/add", upload.single("imageFile"), addBook);
router.put("/update/:id", upload.single("imageFile"), updateBook);
router.delete("/delete/:id", deleteBook);
router.get("/image/:isbn", getBookImage);

module.exports = router;
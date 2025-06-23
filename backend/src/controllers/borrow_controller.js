const Borrow = require("../models/borrow_model");
const Book = require("../models/book_model");
const User = require("../models/user_model");
const { addDays, getCurrentDateTime } = require("../utils/utils");

const addBorrowing = async (req, res) => {
  try {
    const { student_id, isbn } = req.body;

    const user = await User.getUserById(student_id);
    if(user.length === 0) return res.status(404).json({ error: `Student with id ${student_id} doesn't exist` })

    const book = await Book.getBookByIsbn(isbn);
    if(book.length === 0) return res.status(404).json({ error: `Book with isbn ${isbn} doesn't exist` })

    const isAvailable = await Book.checkAvailability(book[0].name);
    
    if(isAvailable[0].amount == 0) return res.status(500).json({ error: "Book not available" })

    const borrow_date = getCurrentDateTime();
    const return_date = addDays(borrow_date, 30);

    await Borrow.addBorrowing(student_id, isbn, return_date);
    const newAmount = book[0].amount - 1;
    await Book.updateBookAmount(isbn, newAmount);

    res.json({ message: "Successfully added borrowing" });
  } catch (error) {
    console.error("Error creating borrowing:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { addBorrowing }
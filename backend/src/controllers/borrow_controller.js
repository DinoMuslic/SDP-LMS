const Borrow = require("../models/borrow_model");
const Book = require("../models/book_model");
const { addDays, getCurrentDateTime } = require("../utils/utils");

const addBorrowing = async (req, res) => {
  try {
    const { student_id, book_id } = req.body;

    const book = await Book.getBookById(book_id);
    const isAvailable = await Book.checkAvailability(book[0].name);
    
    if(isAvailable[0].amount == 0) return res.status(500).json({ error: "Book not available" })

    const borrow_date = getCurrentDateTime();
    const return_date = addDays(borrow_date, 30);

    await Borrow.addBorrowing(student_id, book_id, return_date);
    res.json({ message: "Successfully added borrowing" });
  } catch (error) {
    console.error("Error creating borrowing:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { addBorrowing }
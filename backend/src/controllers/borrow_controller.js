const Borrow = require("../models/borrow_model");
const Book = require("../models/book_model");
const User = require("../models/user_model");
const { addDays, getCurrentDateTime } = require("../utils/utils");

const addBorrowing = async (req, res) => {
  try {
    const { student_id, isbn } = req.body;

    const user = await User.getUserById(student_id);
    if (user.length === 0)
      return res
        .status(404)
        .json({ error: `Student with id ${student_id} doesn't exist` });

    const book = await Book.getBookByIsbn(isbn);
    if (book.length === 0)
      return res
        .status(404)
        .json({ error: `Book with isbn ${isbn} doesn't exist` });

    const isAvailable = await Book.checkAvailability(book[0].name);

    if (isAvailable[0].amount == 0)
      return res.status(500).json({ error: "Book not available" });

    const borrow = await Borrow.getBorrowing(student_id, isbn);
    if (borrow.length > 0) return res.status(500).json({ error: `${user[0]["first_name"]} ${user[0]["last_name"]} already has the book ${book[0]["name"]}` });

    const bookAmount = await Borrow.getBorrowingByStudent(student_id);
    if(bookAmount.length >= 3) return res.status(500).json({ error: `${user[0]["first_name"]} ${user[0]["last_name"]} has 3 books already borrowed` })

    const borrow_date = getCurrentDateTime();
    const return_date = addDays(borrow_date, 30);

    await Borrow.addBorrowing(student_id, isbn, return_date);
    const newAmount = book[0].amount - 1;
    await Book.updateBookAmount(isbn, newAmount);

    res.status(201).json({
      message: `Book ${book[0]["name"]} borrowed to user ${user[0]["first_name"]} ${user[0]["last_name"]}`,
    });
  } catch (error) {
    console.error("Error creating borrowing:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const returnBook = async (req, res) => {
  try {
    const { student_id, isbn } = req.body;

    const user = await User.getUserById(student_id);
    if (user.length === 0)
      return res
        .status(404)
        .json({ error: `Student with id ${student_id} doesn't exist` });

    const book = await Book.getBookByIsbn(isbn);
    if (book.length === 0)
      return res
        .status(404)
        .json({ error: `Book with isbn ${isbn} doesn't exist` });
    
    const borrow = await Borrow.getBorrowing(student_id, isbn);
    if (borrow.length === 0) return res.status(404).json({ error: ` ${user[0]["first_name"]} ${user[0]["last_name"]} didn't borrow the book ${book[0]["name"]}` })

    await Borrow.returnBook(student_id, isbn);
    const newAmount = book[0].amount + 1;
    await Book.updateBookAmount(isbn, newAmount);

    return res.status(201).json({
      message: `Book ${book[0]["name"]} returned by user ${user[0]["first_name"]} ${user[0]["last_name"]}`,
    });
  } catch (error) {
    console.error("Error returning book:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { addBorrowing, returnBook };

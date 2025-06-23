const Book = require("../models/book_model");

const getBooks = async (req, res) => {
  try {
    const books = await Book.getAllBooks();
    res.json(books);
  } catch (error) {
    console.error("Error fetching books:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getBook = async (req, res) => {
  try {
    const book = await Book.getBookByIsbn(req.params.id);
    if (book.length === 0)
      return res.status(404).json({ error: "Book not found" });
    res.json(book);
  } catch (error) {
    console.error("Error fetching book:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const addBook = async (req, res) => {
  try {
    const { isbn, name, genre, year_of_publication, publisher_id, author_id } = req.body;
    const result = await Book.addBook(isbn, name, genre, year_of_publication, publisher_id, author_id);
    res.status(201).json(result);
  } catch (error) {
    console.log("Error adding book:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const updateBook = async(req, res) => {
  try {
    await Book.updateBook(req.params.id, req.body);
    res.status(201).json({ message: "Book updated sucessfully" })
  } catch (error) {
    console.log("Error updating book:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteBook = async (req, res) => {
  try {
    await Book.deleteBook(req.params.id);
    res.status(201).json({ message: "Book deleted sucessfully" })
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).json({ error: "Server error" });
  }
}

const getBooksInfo = async(req, res) => {
  try {
    const books = await Book.getAllBooksInfo();
    res.json(books);
  } catch (error) {
    console.log("Error fetching books:", error);
    res.status(500).json({error: "Server error"});
  }
}

const checkAvailability = async(req, res) => {
  try {
    const title = req.params.title;
    const response = await Book.checkAvailability(title);

    if(response[0].amount === 0 || response[0].amount === null) {
      res.status(404).json({message: `Book with title ${title} not found.`});
    } else res.status(201).json(response[0]);    
  } catch (error) {
    console.log("Error checking book availability:", error);
    res.status(500).json({error: "Server error"});
  }
}

module.exports = { getBooks, getBook, addBook, updateBook, deleteBook, getBooksInfo, checkAvailability };

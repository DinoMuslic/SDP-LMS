const db = require("./db");

const getAllBooks = async () => {
  try {
    const rows = await db.query("SELECT * FROM books");
    return rows[0];
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
};

const getBookByIsbn = async (id) => {
  try {
    const rows = await db.query("SELECT * FROM books WHERE isbn = ?", [id]);
    return rows[0];
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
};

const addBook = async (
  isbn,
  name,
  genre,
  year_of_publication,
  publisher_id,
  author_id
) => {
  try {
    await db.query(
      "INSERT INTO books (isbn, name, genre, year_of_publication, publisher_id, author_id) VALUES (?, ?, ?, ?, ?, ?)",
      [isbn, name, genre, year_of_publication, publisher_id, author_id]
    );
    return { message: "Book added sucessfully" };
  } catch (error) {
    console.log("Database error:", error);
    throw error;
  }
};

const updateBook = async ({
  isbn,
  name,
  genre,
  year_of_publication,
  publisher_id,
  author_id,
}) => {
  try {
    await db.query(
      "UPDATE books SET name = ?, genre = ?, year_of_publication = ?, publisher_id = ?, author_id = ? WHERE isbn = ?",
      [isbn, name, genre, year_of_publication, publisher_id, author_id]
    );
  } catch (error) {
    console.log("Database error:", error);
    throw error;
  }
};

const updateBookAmount = async (isbn, amount) => {
  try {
    await db.query("UPDATE books SET amount = ? WHERE isbn = ?", [
      amount,
      isbn,
    ]);
  } catch (error) {
    console.log("Database error:", error);
    throw error;
  }
};

const deleteBook = async (id) => {
  try {
    await db.query("DELETE FROM books WHERE id = ?", [id]);
  } catch (error) {
    console.log("Database error:", error);
  }
};

const getAllBooksInfo = async () => {
  try {
    const rows = await db.query(
      "SELECT b.name as title, b.genre, b.year_of_publication as yob, b.image, b.description, b.amount , CONCAT(a.first_name, ' ', a.last_name) as author, p.name as publisher FROM books b JOIN authors a ON b.author_id = a.id JOIN publishers p ON b.publisher_id = p.id"
    );
    return rows[0];
  } catch (error) {
    console.log("Database error:", error);
  }
};

const checkAvailability = async (bookName) => {
  try {
    const rows = await db.query(
      "SELECT SUM(amount) as amount FROM books WHERE name LIKE ?",
      [bookName]
    );
    return rows[0];
  } catch (error) {
    console.log("Database error:", error);
  }
};

module.exports = {
  getAllBooks,
  getBookByIsbn,
  addBook,
  updateBookAmount,
  updateBook,
  deleteBook,
  getAllBooksInfo,
  checkAvailability,
};

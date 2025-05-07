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

const getBookById = async (id) => {
  try {
    const rows = await db.query("SELECT * FROM books WHERE id = ?", [id]);
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
    return { message: "Book added sucessfully" }
  } catch (error) {
    console.log("Database error:", error);
    throw error;
  }
};

const updateBook = async(id, { isbn, name, genre, year_of_publication, publisher_id, author_id }) => {
  try {
    await db.query(
      "UPDATE books SET isbn = ?, name = ?, genre = ?, year_of_publication = ?, publisher_id = ?, author_id = ? WHERE id = ?",
      [isbn, name, genre, year_of_publication, publisher_id, author_id, id]
    );
  } catch (error) {
    console.log("Database error:", error);
    throw error;
  }
}

const deleteBook = async(id) => {
  try {
    await db.query(
      "DELETE FROM books WHERE id = ?", [id]
    );
  } catch (error) {
    console.log("Database error:", error);
  }
}

module.exports = { getAllBooks, getBookById, addBook, updateBook, deleteBook };

const db = require("./db");

const addBorrowing = async (
  student_id,
  book_id,
  return_date,
) => {
  try {
    await db.query(
      "INSERT INTO borrowings(student_id, book_id, return_date) VALUES(?, ?, ?)",
      [student_id, book_id, return_date]
    );
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
};

module.exports = { addBorrowing };

const db = require("./db");

const addBorrowing = async (
  student_id,
  isbn,
  return_date,
) => {
  try {
    await db.query(
      "INSERT INTO borrowings(student_id, isbn, return_date) VALUES(?, ?, ?)",
      [student_id, isbn, return_date]
    );
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
};

module.exports = { addBorrowing };

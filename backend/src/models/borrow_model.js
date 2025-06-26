const db = require("./db");

const getBorrowing = async (student_id, isbn) => {
  try {
    const rows = await db.query(
      "SELECT * FROM borrowings where student_id = ? AND isbn = ? AND (returned_status = 'borrowed' OR returned_status = 'late')",
      [student_id, isbn]
    );
    return rows[0];
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
};

const getBorrowingByStudent = async (student_id) => {
  try {
    const rows = await db.query(
      "SELECT * FROM borrowings where student_id = ? AND (returned_status = 'borrowed' OR returned_status = 'late')",
      [student_id]
    );
    return rows[0];
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
};

const getBorrowingInfo= async () => {
  try {
    const rows = await db.query("SELECT u.id, CONCAT(u.first_name, ' ' , u.last_name) as full_name, b.isbn, b.name, bo.borrow_date, bo.return_date, bo.returned_status, bo.returned_date, bo.fine FROM users u JOIN borrowings bo ON u.id = bo.student_id JOIN books b ON b.isbn = bo.isbn WHERE bo.returned_status != 'returned'");
    return rows[0];
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
}

const updateLateBorrowings = async () => {
  try {
    await db.query(`
      UPDATE borrowings
      SET 
        returned_status = 'late',
        fine = DATEDIFF(NOW(), return_date) * 0.3
      WHERE 
        returned_status != 'returned'
        AND return_date < NOW()
    `);
  } catch (error) {
    console.error("Error updating late borrowings:", error);
    throw error;
  }
};

const addBorrowing = async (student_id, isbn, return_date) => {
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

const returnBook = async (student_id, isbn) => {
  try {
    await db.query(
      "UPDATE borrowings SET returned_status = 'returned' , returned_date = NOW() WHERE student_id = ? AND isbn = ?",
      [student_id, isbn]
    );
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
};

const calculateFines = async (student_id) => {
  try {
    const rows = await db.query("SELECT SUM(fine) as total_fines FROM borrowings WHERE student_id = ? AND returned_status != 'returned'", [student_id]);
    return rows[0];
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
}

const calculateAllFines = async () => {
  try {
    const rows = await db.query("SELECT SUM(fine) as total_fines FROM borrowings WHERE returned_status != 'returned'");
    return rows[0];
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
}

module.exports = {
  getBorrowing,
  getBorrowingByStudent,
  getBorrowingInfo,
  updateLateBorrowings,
  addBorrowing,
  returnBook,
  calculateFines,
  calculateAllFines
};

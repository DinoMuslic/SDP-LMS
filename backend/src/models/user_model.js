const db = require("./db");

const getAllUsers = async () => {
  try {
    const [rows] = await db.query("SELECT * FROM users");
    return rows;
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
};

module.exports = { getAllUsers, getUserById };
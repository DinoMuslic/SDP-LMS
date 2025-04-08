const db = require("./db");
const bcrypt = require("bcryptjs");

const getAllUsers = async () => {
  try {
    const rows = await db.query("SELECT * FROM users");
    return rows[0];
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
};

const getUserById = async (id) => {
  try {
    const rows = await db.query("SELECT * FROM users WHERE id = ?", [id]);
    return rows[0];
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
};

const getUserByEmail = async(email) => {
  try {
    const rows = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
  } catch(error) {
    console.log("Database error:", error);
    throw error;
  }
};

const createUser = async(first_name, last_name, email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query("INSERT INTO users (first_name, last_name, email, password, role) VALUES(?, ?, ?, ?, ?)", [first_name, last_name, email, hashedPassword, "student"]);
    return {message: "User created sucessfully"};
  } catch(error) {
    console.error("Database error:", error);
    throw error;
  }
};

module.exports = { getAllUsers, getUserById, getUserByEmail, createUser };
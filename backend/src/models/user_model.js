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

const getUserByEmail = async (email) => {
  try {
    const rows = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    return rows[0];
  } catch (error) {
    console.log("Database error:", error);
    throw error;
  }
};

const createUser = async (first_name, last_name, email, password) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO users (first_name, last_name, email, password, role) VALUES(?, ?, ?, ?, ?)",
      [first_name, last_name, email, hashedPassword, "student"]
    );
    return { message: "User created sucessfully" };
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
};

const updateUser = async (
  id,
  { first_name, last_name, email, role, password }
) => {
  try {
    if (password && password !== "") {
      const hashedPassword = await bcrypt.hash(password, 10);
      const [result] = await db.query(
        "UPDATE users SET first_name = ?, last_name = ?, email = ?, role = ?, password = ? WHERE id = ?",
        [first_name, last_name, email, role, hashedPassword, id]
      );

      if (result.affectedRows === 0) {
        return null;
      }
    } else {
      const [result] = await db.query(
        "UPDATE users SET first_name = ?, last_name = ?, email = ?, role = ? WHERE id = ?",
        [first_name, last_name, email, role, id]
      );
      if (result.affectedRows === 0) {
        return null;
      }
    }

    return { message: "User updated successfully" };
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
};

const deleteUser = async id => {
  try {
    const query = await db.query("DELETE FROM users WHERE id = ?", [id]);
    
    if(query.affectedRows === 0) {
      return null;
    }
  } catch(error) {
    console.error("Database error:", error);
    throw error;
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  getUserByEmail,
  createUser,
  updateUser,
  deleteUser
};

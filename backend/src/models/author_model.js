const db = require("./db");

const getAllAuthors = async () => {
  try {
    const rows = await db.query("SELECT * FROM authors");
    return rows[0];
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
};

const getAuthorById = async (id) => {
  try {
    const rows = await db.query("SELECT * FROM authors WHERE id = ?", [id]);
    return rows[0];
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
};

const addAuthor = async (
  first_name,
  last_name,
  year_of_birth,
  year_of_death
) => {
  try {
    await db.query(
      "INSERT INTO authors (first_name, last_name, year_of_birth, year_of_death) VALUES (?, ?, ?, ?)",
      [first_name, last_name, year_of_birth, year_of_death]
    );
    return { message: "Author added sucessfully" }
  } catch (error) {
    console.log("Database error:", error);
    throw error;
  }
};

const updateAuthor = async(id, { first_name, last_name, year_of_birth, year_of_death }) => {
  try {
    await db.query(
      "UPDATE authors SET first_name = ?, last_name = ?, year_of_birth = ?, year_of_death = ? WHERE id = ?",
      [first_name, last_name, year_of_birth, year_of_death, id]
    );
  } catch (error) {
    console.log("Database error:", error);
    throw error;
  }
}

const deleteAuthor = async(id) => {
  try {
    await db.query(
      "DELETE FROM authors WHERE id = ?", [id]
    );
  } catch (error) {
    console.log("Database error:", error);
  }
}

module.exports = { getAllAuthors, getAuthorById, addAuthor, updateAuthor, deleteAuthor };

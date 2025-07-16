const db = require("./db");

const getAllPublishers = async () => {
  try {
    const rows = await db.query("SELECT * FROM publishers");
    return rows[0];
  } catch (error) {
    console.error("Database error:", error);
    throw error;
  }
};

const addPublisher = async (
  name
) => {
  try {
    await db.query(
      "INSERT INTO publishers (name) VALUES (?)",
      [name]
    );
  } catch (error) {
    console.log("Database error:", error);
    throw error;
  }
};

const updatePublisher = async ({
  id,
  name,
}) => {
  try {
    await db.query(
      "UPDATE publishers SET name = ? WHERE id = ?",
      [name, id]
    );
  } catch (error) {
    console.log("Database error:", error);
    throw error;
  }
};

const deletePublisher = async (id) => {
  try {
    await db.query("DELETE FROM publishers WHERE id = ?", [id]);
  } catch (error) {
    console.log("Database error:", error);
  }
};


module.exports = {getAllPublishers, addPublisher, updatePublisher, deletePublisher };
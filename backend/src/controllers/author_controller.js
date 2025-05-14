const Author = require("../models/author_model");

const getAuthors = async (req, res) => {
  try {
    const authors = await Author.getAllAuthors();
    res.json(authors);
  } catch (error) {
    console.error("Error fetching authors:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getAuthor = async (req, res) => {
  try {
    const author = await Author.getAuthorById(req.params.id);
    if (author.length === 0)
      return res.status(404).json({ error: "Author not found" });
    res.json(author);
  } catch (error) {
    console.error("Error fetching author:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const addAuthor = async (req, res) => {
  try {
    const { first_name, last_name, year_of_birth, year_of_death } = req.body;
    const result = await Author.addAuthor(first_name, last_name, year_of_birth, year_of_death);
    res.status(201).json(result);
  } catch (error) {
    console.log("Error adding author:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const updateAuthor = async(req, res) => {
  try {
    await Author.updateAuthor(req.params.id, req.body);
    res.status(201).json({ message: "Author updated sucessfully" })
  } catch (error) {
    console.log("Error updating author:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteAuthor = async (req, res) => {
  try {
    await Author.deleteAuthor(req.params.id);
    res.status(201).json({ message: "Author deleted sucessfully" })
  } catch (error) {
    console.error("Error deleting author:", error);
    res.status(500).json({ error: "Server error" });
  }
}

module.exports = { getAuthors, getAuthor, addAuthor, updateAuthor, deleteAuthor };

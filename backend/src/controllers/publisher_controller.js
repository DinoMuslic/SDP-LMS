const Publisher = require("../models/publisher_model");

const getPublishers = async (req, res) => {
  try {
    const publishers = await Publisher.getAllPublishers();
    res.json(publishers);
  } catch (error) {
    console.error("Error fetching publishers:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const addPublisher = async (req, res) => {
  try {
    const { name } = req.body;

    const result = await Publisher.addPublisher(name);
    res.status(201).json(result);
  } catch (error) {
    console.log("Error adding publisher:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const updatePublisher = async (req, res) => {
  try {
    const result = await Publisher.updatePublisher({
      id: req.params.id,
      ...req.body,
    });

    if (!result || result.affectedRows === 0) {
      return res.status(404).json({ error: "Publisher not found" });
    }

    res.json({ message: "Publisher updated successfully" });
  } catch (error) {
    console.error("Error updating publisher:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const deletePublisher = async (req, res) => {
  try {
    await Publisher.deletePublisher(req.params.id);
    res.json({ message: "Publisher deleted successfully." });
  } catch (error) {
    console.error("Error updating publisher:", error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getPublishers,
  addPublisher,
  updatePublisher,
  deletePublisher,
};

const express = require("express");
const { getAuthors, getAuthor, addAuthor, updateAuthor, deleteAuthor } = require("../controllers/author_controller");


const router = express.Router();

router.get("/all", getAuthors);
router.get("/:id", getAuthor);
router.post("/add", addAuthor);
router.put("/update/:id", updateAuthor);
router.delete("/delete/:id", deleteAuthor);

module.exports = router;
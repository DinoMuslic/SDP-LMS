const express = require("express");
const { getPublishers, addPublisher, updatePublisher, deletePublisher } = require("../controllers/publisher_controller");

const router = express.Router();

router.get("/all", getPublishers);
router.post("/add", addPublisher)
router.put("/update/:id", updatePublisher);
router.delete("/delete/:id", deletePublisher);

module.exports = router;
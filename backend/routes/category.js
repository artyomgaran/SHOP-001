const express = require("express");
const router = express.Router();
const Category = require("../models/Categories");
const mapCategory = require("../helpers/mapCategory");

// Получить все категории
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({}, { _id: 1, name: 1 });
    res.send({ error: null, data: categories.map(mapCategory) });
  } catch (e) {
    res.send({ error: e.message });
  }
});

module.exports = router;

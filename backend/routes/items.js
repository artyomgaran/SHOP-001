const express = require("express");
const router = express.Router();
const {
  getItems,
  getItem,
  addItem,
  editItem,
  deletItem,
} = require("../controllers/item");
const mapItem = require("../helpers/mapItem");
const authenticated = require("../middlewares/authenticated");
const hasRole = require("../middlewares/hasRole");
const ROLES = require("../constants/roles");

// публичные роуты
router.get("/", async (req, res) => {
  const data = await getItems(req.query.search);
  res.send({ data: data.map(mapItem) });
});

router.get("/:id", async (req, res) => {
  const item = await getItem(req.params.id);
  res.send({ data: mapItem(item) });
});

// защищённые роуты
router.use(authenticated);

router.post("/", hasRole([ROLES.ADMIN]), async (req, res) => {
  const newItem = await addItem(req.body);
  res.send({ data: mapItem(newItem) });
});

router.patch("/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  const updatedItem = await editItem(req.params.id, req.body);
  res.send({ data: mapItem(updatedItem) });
});

router.delete("/:id", hasRole([ROLES.ADMIN]), async (req, res) => {
  await deletItem(req.params.id);
  res.send({ error: null });
});

module.exports = router;

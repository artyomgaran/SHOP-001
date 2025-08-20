const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const itemsRoutes = require("./items");
const cartRoutes = require("./cart");

router.use("/auth", authRoutes);
router.use("/items", itemsRoutes);
router.use("/carts", cartRoutes);

module.exports = router;

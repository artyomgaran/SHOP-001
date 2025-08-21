const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const itemsRoutes = require("./items");
const ordersRoutes = require("./orders");
const categoryRoutes = require("./category");

router.use("/auth", authRoutes);
router.use("/items", itemsRoutes);
router.use("/orders", ordersRoutes);
router.use("/categories", categoryRoutes);

module.exports = router;

const express = require("express");
const router = express.Router();
const authenticated = require("../middlewares/authenticated");
const hasRole = require("../middlewares/hasRole");
const ROLES = require("../constants/roles");
const { addOrder, getOrders } = require("../controllers/order");

router.use(authenticated);

// GET заказов пользователя
router.get("/", hasRole([ROLES.ADMIN, ROLES.CLIENT]), async (req, res) => {
  try {
    const orders = await getOrders(req.user.id);
    res.send({ error: null, data: { orders } });
  } catch (e) {
    res.send({ error: e.message });
  }
});

// POST добавление заказа
router.post("/", hasRole([ROLES.ADMIN, ROLES.CLIENT]), async (req, res) => {
  try {
    const order = await addOrder(req.user.id, req.body);
    res.send({ error: null, data: { order } });
  } catch (e) {
    res.send({ error: e.message });
  }
});

module.exports = router;

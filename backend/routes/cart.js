const express = require("express");
const router = express.Router();
const { editCart } = require("../controllers/cart");
const authenticated = require("../middlewares/authenticated");
const hasRole = require("../middlewares/hasRole");
const ROLES = require("../constants/roles");

router.use(authenticated);

router.patch("/:id", hasRole([ROLES.ADMIN, ROLES.CLIENT]), async (req, res) => {
  try {
    const updatedCart = await editCart(req.params.id, req.body.items);
    res.send({ error: null, data: updatedCart });
  } catch (e) {
    res.send({ error: e.message });
  }
});

module.exports = router;

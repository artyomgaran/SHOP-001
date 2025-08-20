const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/user");
const mapUser = require("../helpers/mapUser");

// POST /api/auth/register
router.post("/register", async (req, res) => {
  try {
    const { user, token } = await register(req.body.login, req.body.password);
    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, user: await mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { user, token } = await login(req.body.login, req.body.password);
    res
      .cookie("token", token, { httpOnly: true })
      .send({ error: null, user: await mapUser(user) });
  } catch (e) {
    res.send({ error: e.message || "Unknown error" });
  }
});

// POST /api/auth/logout
router.post("/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true }).send({});
});

module.exports = router;

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("./routes");
const path = require("path");

const port = 3001;
const app = express();

// Подключаем статику фронтенда
app.use(express.static(path.resolve(__dirname, "../frontend/dist")));

// Парсеры
app.use(cookieParser());
app.use(express.json());

// Все API-роуты через /api
app.use("/api", routes);

// Любые остальные запросы (кроме /api) возвращают index.html
app.use((req, res) => {
  if (req.path.startsWith("/api")) {
    return res.status(404).send({ error: "API route not found" });
  }
  res.sendFile(path.resolve(__dirname, "../frontend/dist/index.html"));
});

mongoose.connect(process.env.DB_CONNECTION_STRING).then(() => {
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
});

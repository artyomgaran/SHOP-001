const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const port = 3001;
const app = express();

app.use(cookieParser());
app.use(express.json());

mongoose
  .connect(
    "mongodb+srv://artyomgaran:Qweqwe123@cluster0.3zsgjur.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  });

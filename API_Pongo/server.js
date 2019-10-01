const express = require("express");
const mongoose = require("mongoose");
const requireDir = require("require-dir");

//Init APP
const app = express();

//Connect database
//mongodb+srv://root:root@cluster0-huzkm.mongodb.net/pongo?retryWrites=true
mongoose.connect(
  "mongodb+srv://root:root@cluster0-huzkm.mongodb.net/pongo?retryWrites=true",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);
requireDir("./src/models");

//Routes
app.use("/", require("./src/routes"));

app.listen(3001);

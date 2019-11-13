const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
const requireDir = require("require-dir");

//Init APP
const app = express();
app.use(express.json());
app.use(cors());

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

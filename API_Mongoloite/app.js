const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require('body-parser')
const app = express();

const url =
  "mongodb+srv://admin:admin@cluster0-huzkm.mongodb.net/test?retryWrites=true";
const apiroutes = require("../API_Mongoloite/routes/api_route.js");

app.use("/", apiroutes);
app.use(bodyParser.json());

mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => {
    app.listen(3000);
    console.log("database connected!");
  })
  .catch(err => console.log(err));

const http = require("http");
const express = require("express");
const mongoose = require("mongoose");
const spoilersRoute = require("./routes/spoilers");
const url =
  "mongodb+srv://admin:admin@cluster0-huzkm.mongodb.net/test?retryWrites=true";

const app = express();

app.use(express.json());

app.use("/api", spoilersRoute);

app.use((request, response, next) => {
  response.status(404).send();
});

app.use((error, request, response, next) => {
  response.status(500).json({ error });
});

mongoose
  .connect(url, { useNewUrlParser: true })
  .then(() => {
    app.listen(3000);
  })
  .catch(err => console.log(err));

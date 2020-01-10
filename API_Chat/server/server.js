require("dotenv").config();
const express = require("express");
var app = express();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

io.on("connection", client => {
  console.log("a user connect");

  client.on("chat", data => {
    console.log("Message received -->", data);

    io.emit("chat", data);
  });
});

io.listen(5000, () => {
  console.log("Listening...");
});

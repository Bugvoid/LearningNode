const http = require("http");
const express = require("express");
const spoilersRoute = require("../API_Spoiler/src/routes/spoiler");

const app = express();
const hostname = "127.0.0.1";
const port = 3000;

app.set("port", port);

app.use(express.json());

app.use("/api", spoilersRoute);

app.use((request, response, next) => {
  response.status(404).send();
});

app.use((error, request, response, next) => {
  response.status(500).json({ error });
});

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log("Servidor em execução");
});

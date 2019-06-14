const http = require("http");
const express = require("express");
const spoilersRoute = require("../API_Spoiler/src/routes/spoiler");

const sequelize = require("../API_Spoiler/src/database/database");

const app = express();

app.use(express.json());

app.use("/api", spoilersRoute);

app.use((request, response, next) => {
  response.status(404).send();
});

app.use((error, request, response, next) => {
  response.status(500).json({ error });
});

sequelize.sync().then(() => {
  const port = process.env.PORT || 3000;

  app.set("port", port);

  const server = http.createServer(app);
  server.listen(port);
});

const express = require("express");
const routes = express.Router();

const TimeController = require("./controllers/TimecardController");

routes.get("/timecards", TimeController.index);

module.exports = routes;

const express = require("express");
const routes = express.Router();

const TimeController = require("./controllers/TimecardController");

routes.get("/timecards", TimeController.index);
routes.get("/timecards/:id", TimeController.show);
routes.post("/timecards", TimeController.store);
routes.put("/timecards/:id", TimeController.update);
routes.delete("/timecards/:id", TimeController.destroy);
module.exports = routes;

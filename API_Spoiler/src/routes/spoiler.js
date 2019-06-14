const express = require("express");
const controller = require("../controller/spoiler");

const router = express.Router();

router.get("/spoilers/:id", controller.buscarUm);

router.get("/spoilers/:id", controller.buscarTodos);

router.post("/spoilers", controller.criar);

router.put("/spoilers/:id", controller.atualizar);

router.delete("/spoilers/:id", controller.deletar);

module.exports = router;

module.exports = (app) => {
  const pedidos = require("../controllers/pedido.controller.js");
  var router = require("express").Router();
  // Create a new Tutorial
  router.post("/", pedidos.create);
  // Retrieve all Tutorials
  router.get("/", pedidos.findAll);
  // Retrieve all published Tutorials
  router.get("/actives", pedidos.findAllActives);
  // Retrieve a single Tutorial with id
  router.get("/:id", pedidos.findOne);
  // Update a Tutorial with id
  router.put("/:id", pedidos.update);
  // Delete a Tutorial with id
  router.delete("/:id", pedidos.delete);
  // Create a new Tutorial
  router.delete("/", pedidos.deleteAll);
  app.use("/api/pedidos", router);
};

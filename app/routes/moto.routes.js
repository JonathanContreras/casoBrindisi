module.exports = (app) => {
  const motos = require("../controllers/moto.controller.js");
  var router = require("express").Router();
  // Create a new Tutorial
  router.post("/", motos.create);
  // Retrieve all Tutorials
  router.get("/", motos.findAll);
  // Retrieve all published Tutorials
  router.get("/actives", motos.findAllActives);
  // Retrieve a single Tutorial with id
  router.get("/:id", motos.findOne);
  // Update a Tutorial with id
  router.put("/:id", motos.update);
  // Delete a Tutorial with id
  router.delete("/:id", motos.delete);
  // Create a new Tutorial
  router.delete("/", motos.deleteAll);
  app.use("/api/motos", router);
};

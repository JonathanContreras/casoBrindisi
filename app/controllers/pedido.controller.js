const db = require("../models");
const Pedido = db.pedidos;
// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (
    req.body.nombre === "" ||
    req.body.fecha_hora_despacho === "" ||
    req.body.tiempo_estimado_entrega === 0
  ) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Tutorial
  const pedido = new Pedido({
    nombre: req.body.nombre,
    pedido: req.body.pedido,
    direccion: req.body.direccion,
    asignado: req.body.asignado,
    id_pedido: req.body.id_pedido,
    fecha_hora_despacho: req.body.fecha_hora_despacho,
    tiempo_estimado_entrega: req.body.tiempo_estimado_entrega,
    precio: req.body.precio,
    estado: req.body.estado,
  });
  // Save Tutorial in the database
  pedido
    .save(pedido)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Pedido.",
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const nombre = req.query.nombre;
  var condition = nombre
    ? { nombre: { $regex: new RegExp(nombre), $options: "i" } }
    : {};
  Pedido.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};
// Find a single Tutorial with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Pedido.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Pedido with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Pedido with id=" + id });
    });
};
// Update a Tutorial by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }
  const id = req.params.id;
  Pedido.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Pedido with id=${id}. Maybe Pedido was not found!`,
        });
      } else res.send({ message: "Pedido was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Pedido with id=" + id,
      });
    });
};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Pedido.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Pedido with id=${id}. Maybe Pedido was not found!`,
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Tutorial with id=" + id,
      });
    });
};
// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Pedido.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Pedido were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Pedido.",
      });
    });
};
// Find all published Tutorials
exports.findAllActives = (req, res) => {
  Pedido.find({ activa: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving pedidos.",
      });
    });
};

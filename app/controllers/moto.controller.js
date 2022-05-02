const db = require("../models");
const Moto = db.motos;
// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (req.body.patente === "" || req.body.chofer === "") {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  // Create a Tutorial
  const moto = new Moto({
    patente: req.body.patente,
    chofer: req.body.chofer,
    activa: req.body.activa ? req.body.activa : false,
  });
  // Save Tutorial in the database
  moto
    .save(moto)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Moto.",
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const patente = req.query.patente;
  var condition = patente
    ? { patente: { $regex: new RegExp(patente), $options: "i" } }
    : {};
  Moto.find(condition)
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
  Moto.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Moto with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res.status(500).send({ message: "Error retrieving Moto with id=" + id });
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
  Moto.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Moto with id=${id}. Maybe Moto was not found!`,
        });
      } else res.send({ message: "Moto was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Moto with id=" + id,
      });
    });
};
// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;
  Moto.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Moto with id=${id}. Maybe Moto was not found!`,
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
  Moto.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Moto were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while removing all Moto.",
      });
    });
};
// Find all published Tutorials
exports.findAllActives = (req, res) => {
  Moto.find({ activa: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving motos.",
      });
    });
};

const express = require("express");
const path = __dirname + "/app/views/";
const cors = require("cors");
const app = express();
app.use(express.static(path));

var corsOptions = {
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  //res.json({ message: "Welcome to bezkoder application." });
  res.sendFile(path + "index.html");
});
require("./app/routes/tutorial.routes")(app);
require("./app/routes/moto.routes")(app);
require("./app/routes/pedido.routes")(app);
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

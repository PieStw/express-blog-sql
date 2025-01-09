// CONFIGURAZIONE VARIABILI DI AMBIENTE
require("dotenv").config();

// CONFIGURAZIONE EXPRESS
const express = require("express");
const app = express();
const port = process.env.HOST_PORT;
const domain = process.env.HOST_DOMAIN;
var cors = require("cors");

// CARTELLA DELLE FOTO CARICATA ONLINE
app.use(express.static("public"));
app.use(cors());
app.use(express.json());

// IMPORT DELLE ROUTERS
const post = require("./routers/post.js");

//SETTINGS ROUTERS
app.use("/post", post);

// SET ERROR HANDLER
const errorsHandler = require("./middlewares/error.js");
app.use(errorsHandler.errorsHandler);
app.use(errorsHandler.notFound);

app.get("/", (req, res) => {
  res.send("Server del mio Blog");
});

// START LISTENING
app.listen(port, () => {
  console.log(`Server online all'indirizzo: ${domain}:${port}`);
});

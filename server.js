const express = require("express");

// const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");

// set nbfc as global this is used to load the default nbfc configuration

// after as per request we load the required configuration 

global.nbfc="default";

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json()); /* bodyParser.json() is deprecated */

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true })); /* bodyParser.urlencoded() is deprecated */

// health check
app.get("/", (req, res) => {
  res.json({ message: "Welcome to colender api @author-Ajinkya Jadhav." });
});

require("./app/routes/colender.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

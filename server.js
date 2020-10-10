const five = require("johnny-five");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const PORT = process.env.PORT || 3001;
const board = new five.Board();
let state = {};

app.use(cors());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json());




board.on("ready", function() {
  state = {pins: board.pins, type: board.type, port: board.port, sensors: {}};

  app.get("/sensors/proximity", (req, res) => {
    res.send(state.sensors.proximity);
  });

  app.get("/board", (req, res) => {
    const {pins, type, port} = state;
    res.send({pins, type, port});
  });

  const proximity = new five.Proximity({
    controller: "HCSR04",
    pin: 7
  });

  proximity.on("data", function(data) {
    const {inches, centimeters} = data;
    state.sensors["proximity"] = {inches, centimeters};
  });


  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});
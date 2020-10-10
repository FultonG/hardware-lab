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

  app.get("/sensors/:name", (req, res) => {
    const {name} = req.params;
    let sensorData = state.sensors[name];
    if(typeof sensorData === 'undefined'){
      res.status(404).send('Sensor not found!');
    }
    res.send(sensorData);
  });

  app.get("/board", (req, res) => {
    const {pins, type, port} = state;
    res.send({pins, type, port});
  });

  app.post('/add/proximity', (req, res) => {
    const {name, pin} = req.body;
    addProximity(name, pin);
    res.send(`Proximity Sensor ${name} Added on Pin ${pin}`);
  })


  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});

const addProximity = (name, pin) => {
  const proximity = new five.Proximity({
    controller: "HCSR04",
    pin
  });

  proximity.on("data", function(data) {
    const {inches, centimeters} = data;
    state.sensors[name] = {inches, centimeters};
  });
}
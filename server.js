const five = require("johnny-five");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

const PORT = process.env.PORT || 3001;
const board = new five.Board({ repl: false });
let state = {};

app.use(cors());

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json());




board.on("ready", function () {
  state = { pins: board.pins, type: board.type, port: board.port, sensors: {} };

  app.get("/sensors", (req, res) => {
    let sensors = [];
    for(const attr in state.sensors){
      sensors.push({...state.sensors[attr], name: attr})
    }
    res.send(sensors);
  });

  app.get("/sensors/:name", (req, res) => {
    const { name } = req.params;
    let sensorData = state.sensors[name];
    if (typeof sensorData === 'undefined') {
      res.status(404).send('Sensor not found!');
    }
    res.send(sensorData);
  });

  app.get("/board", (req, res) => {
    const { pins, type, port } = state;
    res.send({ pins, type, port });
  });

  app.post('/add/proximity', (req, res) => {
    const { name, pin, controller } = req.body;
    addProximity(name, controller, pin);
    res.send(`Proximity Sensor '${name}'`);
  })

  app.post('/add/i2c', (req, res) => {
    const { controller, type } = req.body;
    addI2c(controller, type, res);
  });


  app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});

const addProximity = (name, controller, pin) => {
  let proximity;
  if (typeof pin === 'undefined') {
    proximity = new five.Proximity({
      controller
    });
  } else {
    proximity = new five.Proximity({
      controller,
      pin
    });
  }

  state.sensors[name] = { status: 'inactive', type: 'Proximity' };
  proximity.on("data", function (data) {
    const { inches, centimeters } = data;
    if(inches !== 0 && centimeters !== 0){
      state.sensors[name] = { status: 'active', type: 'Proximity', inches, centimeters };
    } else {
      state.sensors[name] = { status: 'inactive', type: 'Proximity' };
    }
    
  });
}

const addI2c = (controller, type, res) => {
  switch (type) {
    case 'Altimeter':
      addAltemeter(controller, res);
      break;
    case 'Barometer':
      addBarometer(controller, res);
      break;
    default:
      res.status(404).send('i2c type not found!');
  }
}

const addAltemeter = (controller, res) => {
  var barometer = new five.Altimeter({
    controller
  });

  state.sensors.i2c = { status: 'inactive', type: 'Altimeter' };

  barometer.on("data", function () {
    const { feet, meters } = data;
    state.sensors.i2c = { status: "active", type: 'Altimeter', feet, meters };
  });

  res.send(`Altemeter '${name}' was added successfully!`);
}

const addBarometer = (controller, res) => {
  var barometer = new five.Altimeter({
    controller
  });

  state.sensors.i2c = { status: 'inactive', type: 'Barometer' };

  barometer.on("data", function () {
    const { pressure } = data;
    state.sensors.i2c = { status: "active", type: 'Barometer', pressure };
    console.log(state);
  });

  res.send(`Barometer was added successfully!`);
}
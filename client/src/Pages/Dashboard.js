import React, { useEffect, useState } from 'react';
import Container from '../Components/Container';
import { Title, Text } from '../Components/Text';
import Card from '../Components/Card';
import API from '../API';
import Loading from '../icons/loading.svg'
import styled from 'styled-components';
import Button from '../Components/Button';
import Modal from '../Components/Modal';
import Check from '../gifs/check.gif'
import Input from '../Components/Input';
import ProximitySensorCard from '../Components/ProximitySensorCard';
const Code = styled.code`
  background: #cfcfcf;
`;

const initialSensor = {
  type: 'Proximity',
  data: {
    text: "Pulse/PWM ex.HC-SR04",
    value: "HCSR04",
    type: "Digital"
  }
}

const Dashboard = () => {
  const [board, setBoard] = useState(null);
  const [sensors, setSensors] = useState([]);
  const [addSensor, setAddSensor] = useState(false);
  const [newSensor, setNewSensor] = useState(initialSensor);
  const [sensorSuccess, setSensorSuccess] = useState(false);
  useEffect(() => {
    fetchBoardData()
    fetchSensors();
  }, []);

  const fetchBoardData = async () => {
    try {
      let res = await API.getBoardData();
      setBoard(res.data);
    } catch (e) {
      console.log(e.message);
    }
  }

  const fetchSensors = async () => {
    try {
      let res = await API.getSensors();
      setSensors(res.data);
    } catch (e) {
      console.log(e.message);
    }
  }

  const handleProximityControllerChange = (e) => {
    let index = e.currentTarget.value;
    setNewSensor(prev => ({ ...prev, data: proximityList[index] }))
  }

  const handlePinChange = (e) => {
    let pin = e.currentTarget.value;
    setNewSensor(prev => ({ ...prev, data: { ...prev.data, pin } }));
  }

  const handleNameChange = (e) => {
    let name = e.currentTarget.value;
    setNewSensor(prev => ({ ...prev, data: { ...prev.data, name } }));
  }

  const handleChangeSensorType = (e) => {
    let type = e.currentTarget.value;
    if(type === 'i2c'){
      setNewSensor({ ...initialSensor, type, i2cType: 'Altimeter' })
    } else {
      setNewSensor({ ...initialSensor, type  })
    }
    
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (newSensor.type === 'Proximity') {
        let { data } = newSensor;

        let res = await API.addNewProximitySensor({ pin: data.pin, name: data.name, controller: data.value });
        if (res.status === 200) {
          setSensorSuccess(true);
        }
      }
      else {
        console.log(newSensor);
        let controller = newSensor.i2cController || 'BMP180';
        let res = await API.addI2c({type: newSensor.i2cType, controller})
        if (res.status === 200) {
          setSensorSuccess(true);
        }
      }
    } catch (e) {
      console.log(e.message);
    }

  }

  const handleCloseSuccessModal = () => {
    setAddSensor(false);
    setSensorSuccess(false);
    setNewSensor(initialSensor);
    fetchSensors();
  }

  return (
    <>
      <Container direction="column" padding="30px" overflow>
        <Title>Hardware Lab</Title>
        <Container wrap="wrap" >
          <Text>Board</Text>
          <Container height="50%" margin="10px 0px 20px 0px">
            <Card padding="20px" width="40%">
              {board ? (
                <Container justify="space-around" align="unset" direction="column" >
                  <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/ArduinoUno.svg/285px-ArduinoUno.svg.png" style={{height: '50%', width:'40%', alignSelf: 'center'}}/>
                  <Text>Board Type: <Code>{board.type}</Code></Text>
                  <Text>Port: <Code>{board.port}</Code></Text>
                  <Button onClick={() => setAddSensor(true)}>New Sensor</Button>
                </Container>
              ) : <img src={Loading} />}
            </Card>
          </Container>
          {sensors.length > 0 && <Text>Sensors</Text>}
          <Container height="60%">
            {sensors.map(sensor => (
              <ProximitySensorCard initalSensor={sensor} />
            ))}
          </Container>

        </Container>
      </Container>
      <Modal show={addSensor}>
        <Card minHeight="60%" width="50%" padding="20px">
          {!sensorSuccess ? (
            <Container as="form" direction="column" justify="space-evenly" height="100%" onSubmit={handleFormSubmit}>
              <Title>New Sensor</Title>
              <Input as="select" className="selector" value={newSensor.type} onChange={handleChangeSensorType}>
                <option value="Proximity">Proximity</option>
                <option value="i2c">i2c</option>
              </Input>
              {newSensor.type === 'Proximity' && (
                <>
                  <Input as="select" className="selector" onChange={handleProximityControllerChange}>
                    {proximityList.map((option, index) => (
                      <option value={index} key={index}>{option.text}</option>
                    ))}
                  </Input>
                  <Input placeholder="Name" value={newSensor.data.name} onChange={handleNameChange}></Input>
                  {sensorPinMessage[newSensor.data.type]}
                  {newSensor.data.type !== "i2c" && <Input placeholder="Pin" value={newSensor.data.pin} onChange={handlePinChange}></Input>}
                </>)}
              {newSensor.type === 'i2c' && (
                <>
                  <Input as="select" className="selector" value={newSensor.i2cType} onChange={(e) => setNewSensor(prev=> ({...prev, i2cType: e.currentTarget.value, i2cController: 'BMP180'}))}>
                    {i2cList.map((option, index) => (
                      <option value={option.value} key={index}>{option.text}</option>
                    ))}
                  </Input>
                 
                  {newSensor.i2cType === 'Barometer' && (
                     <Input as="select" className="selector" value={newSensor.i2cController} onChange={(e) => setNewSensor(prev => ({...prev, i2cController: e.currentTarget.value}))}>
                     {BarometerList.map((option, index) => (
                       <option value={option.value} key={index}>{option.text}</option>
                     ))}
                   </Input>
                  )}
                  {newSensor.i2cType === 'Altimeter' && (
                     <Input as="select" className="selector" value={newSensor.i2cController} onChange={(e) => setNewSensor(prev => ({...prev, i2cController: e.currentTarget.value}))}>
                     {AltimeterList.map((option, index) => (
                       <option value={option.value} key={index}>{option.text}</option>
                     ))}
                   </Input>
                  )}
                  {sensorPinMessage.i2c}
                </>
              )}
              <Container height="auto" margin="10px 0px 0px 0px">
                <Button margin="0px 10px 0px 0px">Add Sensor</Button>
                <Button type="button" onClick={() => setAddSensor(false)}>Cancel</Button>
              </Container>
            </Container>
          ) : (
              <Container direction="column">
                <Container justify="center"><img src={Check} /></Container>
                <Container justify="center"><Text>{newSensor.type} Sensor Added Successfully</Text></Container>
                <Container justify="center" margin="15px 0px 0px 0px"><Button onClick={handleCloseSuccessModal}>Ok</Button></Container>
              </Container>
            )}

        </Card>
      </Modal>
    </>
  )
}

const proximityList = [
  {
    text: "Pulse/PWM ex.HC-SR04",
    value: "HCSR04",
    type: "Digital"
  },
  {
    text: "HCSR04 (and friends) I2C Backpack",
    value: "HCSR04I2CBACKPACK",
    type: "i2c"
  },
  {
    text: "Analog GP2Y0A21YK (and friends)",
    value: "GP2Y0A21YK",
    type: "Analog"
  },
  {
    text: "LIDAR-Lite",
    value: "LIDARLITE",
    type: "i2c"
  },
  {
    text: "SRF10",
    value: "SRF10",
    type: "i2c"
  },
  {
    text: "Analog GP2Y0A710K0F",
    value: "GP2Y0A710K0F",
    type: "Analog"
  },
  {
    text: "MB1000 LV-MaxSonar-EZ0",
    value: "MB1000",
    type: "Analog"
  },
  {
    text: "MB1003 HRLV-MaxSonar-EZ0",
    value: "MB1003",
    type: "Analog"
  },
  {
    text: "MB1230 XL-MaxSonar-EZ3",
    value: "MB1230",
    type: "Analog"
  }
]

const i2cList = [
  {
    text: 'Altimeter',
    value: 'Altimeter'
  },
  {
    text: 'Barometer',
    value: 'Barometer'
  }
]

const AltimeterList = [
  {
    text: 'BMP180',
    value: 'BMP180'
  },
  {
    text: 'MPL3115A2',
    value: 'MPL3115A2'
  },
  {
    text: 'MS5611',
    value: 'MS5611'
  }
];

const BarometerList = [
  {
    text: 'MPL115A2',
    value: 'MPL115A2'
  },
  {
    text: 'BMP180',
    value: 'BMP180'
  },
  {
    text: 'MPL3115A2',
    value: 'MPL3115A2'
  },
  {
    text: 'MS5611',
    value: 'MS5611'
  }
]

const sensorPinMessage = {
  'Analog': (
    <Text>Sensor Type: <Code>Analog</Code>. Pin should be <Code>A0, A1, A2, or A3</Code></Text>
  ),
  'Digital': (
    <Text>Sensor Type: <Code>Digital</Code>. Pin should be a number between <Code>1 and 13</Code></Text>
  )
  ,
  'i2c': (
    <Text>Sensor Type: <Code>i2c</Code>. Make sure to use Pins <Code>A4 and A5</Code></Text>
  )
}

export default Dashboard;
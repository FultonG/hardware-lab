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
  const [sensors, setSensors] = useState(null);
  const [addSensor, setAddSensor] = useState(false);
  const [newSensor, setNewSensor] = useState(initialSensor);
  useEffect(() => {
    fetchBoardData()
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
      console.log(res.data);
      setSensors(res.data);
    } catch (e) {
      console.log(e.message);
    }
  }

  const handleProximityControllerChange = (e) => {
    let index = e.currentTarget.value;
    setNewSensor(prev => ({ ...prev, data: proximityList[index] }))
  }

  return (
    <>
      <Container direction="column" padding="30px">
        <Title>Hardware Lab</Title>
        <Container wrap="wrap">
          <Card padding="20px" width="50" height="50%">
            {board ? (
              <Container justify="space-around" align="unset" direction="column" >
                <Text>Board Type <Code>{board.type}</Code></Text>
                <Text>Port <Code>{board.port}</Code></Text>
                <Button onClick={() => setAddSensor(true)}>New Sensor</Button>
              </Container>
            ) : <img src={Loading} />}
          </Card>
        </Container>
      </Container>
      <Modal show={addSensor}>
        <Card minHeight="60%" width="50%" padding="20px">
          <Container as="form" direction="column" justify="space-evenly" height="100%">
            <Title>New Sensor</Title>
            <Input as="select" className="selector" value={newSensor.type} onChange={(e) => setNewSensor({ ...initialSensor, type: e.currentTarget.value })}>
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
                <Input placeholder="Name"></Input>
                {sensorPinMessage[newSensor.data.type]}
                {newSensor.data.type !== "i2c" && <Input placeholder="Pin"></Input>}
              </>)}
              {newSensor.type === 'i2c' && (
                <>
                <Input as="select" className="selector" >
                  {i2cList.map((option, index) => (
                    <option value={option.value} key={index}>{option.text}</option>
                  ))}
                </Input>
                {sensorPinMessage.i2c}
                </>
              )}
            <Container height="auto" margin="10px 0px 0px 0px">
              <Button margin="0px 10px 0px 0px">Add Sensor</Button>
              <Button type="button" onClick={() => setAddSensor(false)}>Cancel</Button>
            </Container>
          </Container>
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
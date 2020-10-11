import React, { useEffect, useState } from 'react';
import Container from '../Components/Container';
import {Text , Title} from '../Components/Text';
import API from '../API';
import Card from '../Components/Card';
import ProximityChart from '../Components/ProximityChart';
const Monitor = () => {
  const [sensors, setSensors] = useState([]);
  useEffect(() => {
    fetchSensors();
  }, [])

  const fetchSensors = async () => {
    try {
      let res = await API.getSensors();
      setSensors(res.data);
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <Container direction="column" padding="30px" overflow>
      <Title>Monitor</Title>
      <Container wrap="wrap" >
        {sensors.map((sensor) => (
          <Card key={sensor.name} height="70%" width="45%" margin="30px 10px 0px 0px" padding="20px">
            <Text>Sensor: {sensor.name}</Text>
            <Container>
            <ProximityChart initialSensor={sensor}/>
            </Container>
            
          </Card>
        ))}
      </Container>
    </Container>
  )
}

export default Monitor;
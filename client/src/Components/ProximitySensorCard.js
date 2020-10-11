import React, { useState, useEffect } from 'react';
import Card from './Card';
import Container from './Container';
import {Text} from './Text';
import styled from 'styled-components';
import API from '../API';

const Code = styled.code`
  background: #cfcfcf;
`;


const ProximitySensorCard = ({ initalSensor }) => {
  const [sensor, setSensor] = useState(initalSensor)
  useEffect(() => {
    setInterval(fetchSensorData, 100);
  }, []);

  const fetchSensorData = async () => {
    try {
      let res = await API.getSensor(sensor.name);
      setSensor(prev => ({...prev, ...res.data}));
    } catch(e){
      console.log(e.message);
    }
    
    
  }
  return (
    <Card padding="20px" width="30%" height="70%" margin="10px 10px 0px 0px">
      <Container justify="space-around" align="unset" direction="column" >
        <Text>Name: <Code>{sensor.name}</Code></Text>
        <Text>Status: <Code>{sensor.status}</Code></Text>
        <Text>Type: <Code>{sensor.type}</Code></Text>
        {sensor.type === 'Proximity' && sensor.status === 'active' && (
          <>
            <Text>Last Data Received</Text>
            <Text>Distance: <Code>{sensor.centimeters}cm/{sensor.inches}in</Code></Text>
          </>
        )}
      </Container>
    </Card>
  )
}

export default ProximitySensorCard;
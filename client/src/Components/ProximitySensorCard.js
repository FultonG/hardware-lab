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
  const [monitoring, setMonitoring] = useState(true);
  const [intervalState, setIntervalState] = useState(null);
  useEffect(() => {
    if(monitoring){
      setIntervalState(setInterval(fetchSensorData, 100));
    } else {
      clearInterval(intervalState);
      setIntervalState(null);
    }
  }, [monitoring]);

  const fetchSensorData = async () => {
    try {
      let res = await API.getSensor(sensor.name);
      setSensor(prev => ({...prev, ...res.data}));
    } catch(e){
      console.log(e.message);
    }
  }

  return (
    <Card padding="20px" width="30%" height="100%" margin="10px 10px 0px 0px" onClick={() => setMonitoring(prev => !prev)} hover cursor="pointer">
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
        <Text>Monitoring: {!monitoring ? 
        <img src="https://upload.wikimedia.org/wikipedia/commons/9/92/Location_dot_red.svg" style={{width: "15px", height: '15px'}}/> : 
        <img src="https://www.clker.com/cliparts/c/7/U/N/A/T/green-dot-small.svg.med.png" style={{width: "15px", height: '15px'}}/> }</Text>
      </Container>
    </Card>
  )
}

export default ProximitySensorCard;
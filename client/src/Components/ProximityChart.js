import React, { useEffect, useState } from 'react';
import { Chart } from 'react-charts';
import Card from './Card';
import API from '../API';


const ProximityChart = ({initialSensor}) => {
  const [intervalState, setIntervalState] = useState(null);
  const [sensorData, setSensorData] = useState([[Date.now(),0]]);
  const axes = React.useMemo(
    () => [
      { primary: true, type: 'time', position: 'bottom' },
      { type: 'linear', position: 'left' }
    ],
    []
  )

  useEffect(() => {
    setIntervalState(setInterval(fetchSensorData, 100));
    return () => clearInterval(intervalState);
  }, []);

  const fetchSensorData = async () => {
    try {
      let res = await API.getSensor(initialSensor.name);
      setSensorData(prev => [...prev, [Date.now(), res.data.inches]])
    } catch(e){
      console.log(e.message);
    }
  }
  return (
      <Chart data={[{data: sensorData, label: "inches"}]} axes={axes}></Chart>
  )
}

export default ProximityChart;
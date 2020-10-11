import axios from 'axios';

export default {
  getBoardData: () => axios.get('/board'),
  getSensors: () => axios.get('/sensors'),
  addNewProximitySensor: (data) => axios.post('/add/proximity', data),
  getSensor: (name) => axios.get(`/sensors/${name}`),
  addI2c: (data) => axios.post('/add/i2c', data)
}
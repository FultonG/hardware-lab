import axios from 'axios';

export default {
  getBoardData: () => axios.get('/board'),
  getSensors: () => axios.get('/sensors'),
  addNewProximitySensor: (data) => axios.post('/add/proximity', data),
  getSensor: (name) => axios.get(`/sensors/${name}`)
}
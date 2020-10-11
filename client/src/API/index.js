import axios from 'axios';

export default {
  getBoardData: () => axios.get('/board'),
  getSensors: () => axios.get('/sensors')
}
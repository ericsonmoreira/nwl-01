import axios from 'axios';

// http://192.168.1.15:3333/

const api = axios.create({
  baseURL: 'http://192.168.1.2:3333'
});

export default api;
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dropbox-clone-api-node.herokuapp.com/'
})

export default api;
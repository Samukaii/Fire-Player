import axios from 'axios';

const DZapi = axios.create({
  baseURL: 'https://api.deezer.com/',
});

export default DZapi;

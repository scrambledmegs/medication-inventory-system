import axios from 'axios';

const medicationData = axios.create(
  {
    baseURL: 'http://localhost:4000/medications'
  }
);

export default medicationData;
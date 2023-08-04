import axios from 'axios';

const patientData = axios.create(
  {
    baseURL: 'http://localhost:4000/patients'
  }
);

export default patientData;
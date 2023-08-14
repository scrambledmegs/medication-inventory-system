import axios from 'axios';

const patientMedicationData = axios.create(
  {
    baseURL: 'http://localhost:4000/patientmedication'
  }
);

export default patientMedicationData;
import React, { useContext, useEffect } from 'react';
import PatientData from '../apis/PatientData';
import { PatientsContext } from '../context/PatientsContext';

// Bootstrap 
import ListGroup from 'react-bootstrap/ListGroup';

const PatientList = (props) => {
  const { patients, setPatients } = useContext(PatientsContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PatientData.get('/');
        setPatients(response.data.data.patients);
      } catch (err) {
        console.log(err)
      };
    };
    fetchData();
  }, []);

  return (
    <div>
      <h1>Patient List</h1>
      {patients && patients.map(patient => {
        return (
          <ListGroup as='ul' key={patient.patient_id}>
            <ListGroup.Item as='li' variant='primary'>
              {patient.patient_name}
            </ListGroup.Item>
            <ListGroup.Item as='li'>
              MRN: {patient.patient_mrn}
            </ListGroup.Item>
            <ListGroup.Item as='li'>
              DOB: {patient.patient_dob}
            </ListGroup.Item>
            <ListGroup.Item as='li'>
              Allergies: {patient.patient_allergies}
            </ListGroup.Item>
            <ListGroup.Item as='li'>
              Room: {patient.room_number}
            </ListGroup.Item>
            <ListGroup.Item as='li'>
              {patient.department}
            </ListGroup.Item>
          </ListGroup>
        )
      })}
    </div>
  )
}

export default PatientList;
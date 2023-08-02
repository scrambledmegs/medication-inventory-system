import React, { useContext, useEffect } from 'react';
import PatientData from '../apis/PatientData';
import { PatientsContext } from '../context/PatientsContext';

// Bootstrap 
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button'

const PatientList = (props) => {
  const { patients, setPatients } = useContext(PatientsContext)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await PatientData.get('/');
        console.log('RESPONSE PL:', response)
        setPatients(response.data.data.patients)
      } catch (err) {
        console.log(err)
      };
    };
    fetchData();
  }, []);

    const handleDelete = async(id) => {
      try {
        const response = await PatientData.delete(`/${id}`)
        setPatients(patients.filter(patient => {
          return patient.id !== id
        }))
      } catch (err) {
        console.log(err)
      }
    };

  return (
    <div>
      <h1>Patient List</h1>
      {patients && patients.map(patient => {
        return (
          <ListGroup as='ul' key={patient.id}>
            <ListGroup.Item 
              as='li' 
              variant='primary'
              // onClick={() => handleSelectPatient(patient.id)}
              >
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
            <ListGroup.Item as='li'>
              <Button
                onClick={()=> handleDelete(patient.id)}
              >
                Discharge Patient</Button>
            </ListGroup.Item>
          </ListGroup>
        )
      })}
    </div>
  )
}

export default PatientList;
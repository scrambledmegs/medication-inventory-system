import React, { useContext, useEffect } from 'react';
import PatientData from '../apis/PatientData';
import { PatientContext } from '../context/PatientContext';

// React Router
import { useNavigate } from 'react-router-dom';

// Bootstrap 
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button'

const PatientList = () => {
  const { patients, setPatients, setSelectedPatient } = useContext(PatientContext);
  let navigate = useNavigate();

  // Get patient list from database
  useEffect(() => {
    PatientData.get('http://localhost:4000/patients')
      .then(response => {
        console.log('RESPONSE PATIENT LIST:', response);
        setPatients(response.data.data.patients);
      });
  }, []);

  // Delete Patient
    const handleDelete = async (patientId) => {
      PatientData.delete(`http://localhost:4000/patients/${patientId}`)
        .then(() => {
          setPatients(prevPatients => {
            const updatedPatients = prevPatients.filter(patient => patient.id !== patientId);
            return updatedPatients;
          });
        });
    };

    // Set Selected Patient by ID
    const selectPatient = (patientId) => {
      const patient = patients.filter(patient => patient.id === patientId);
      setSelectedPatient(patient[0]);
    }

    const handleSelectPatient = patientId => {
      PatientData.get(`http://localhost:4000/patients/${patientId}`)
        .then(response => {
          console.log('RESPONSE SELECT:', response);
          selectPatient(patientId);
          navigate(`/patients/${patientId}`);
        })
        .catch (error => {
          console.log('error:', error);
        });
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
                action onClick={() => handleSelectPatient(patient.id)}
                >
                {patient.name}
              </ListGroup.Item>
              <ListGroup.Item as='li'>
                MRN: {patient.mrn}
              </ListGroup.Item>
              <ListGroup.Item as='li'>
                DOB: {patient.dob}
              </ListGroup.Item>
              <ListGroup.Item as='li'>
                Allergies: {patient.allergies}
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
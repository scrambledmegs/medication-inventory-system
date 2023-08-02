import React, { useContext, useEffect } from 'react';
import PatientData from '../apis/PatientData';
import { PatientContext } from '../context/PatientContext';
import { useNavigate } from 'react-router-dom';

// Bootstrap 
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button'

const PatientList = () => {
  const { patients, setPatients } = useContext(PatientContext);
  const { selectedPatient, setSelectedPatient } = useContext(PatientContext);
  let navigate = useNavigate();

  console.log('SELECTED PATIENT:', selectedPatient);

  // Get information from database
  useEffect(() => {
    PatientData.get('/')
      .then(response => {
        console.log('RESPONSE LIST:', response);
        setPatients(response.data.data.patients);
      });
  }, []);

  // Delete Patient
    const handleDelete = async (id) => {
      PatientData.delete(`/${id}`)
        .then(() => {
          setPatients(prevPatients => {
            const updatedPatients = prevPatients.filter(patient => patient.id !== id);
            return updatedPatients;
          });
        });
    };

    // Select Patient by ID
    const handleSelectPatient = id => {
      console.log('SELECT ID:', id);
      PatientData.get(`/${id}`)
        .then(response => {
          console.log('RESPONSE SELECT:', response);
          setSelectedPatient(response.data[0]);
          navigate(`/patients/${id}`);
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
              onClick={() => handleSelectPatient(patient.id)}
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
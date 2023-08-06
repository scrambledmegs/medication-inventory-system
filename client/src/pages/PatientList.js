import React, { useContext, useEffect } from 'react';
import PatientData from '../apis/PatientData';
import { PatientContext } from '../context/PatientContext';

// React Router
import { useNavigate } from 'react-router-dom';

// Bootstrap 
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PatientList = () => {
  const { patients, setPatients, setSelectedPatient } = useContext(PatientContext);
  let navigate = useNavigate();

  // Get patient list from database
  useEffect(() => {
    PatientData.get('/')
      .then(response => {
        console.log('RESPONSE PATIENT LIST:', response);
        setPatients(response.data.data.patients);
      });
  }, []);

  // Delete Patient
    const handleDelete = async (patientId) => {
      PatientData.delete(`/${patientId}`)
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
      PatientData.get(`/${patientId}`)
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
    <main>
      <h1>Patient List</h1>
      <Row>
        <Col>
        {patients && patients.map(patient => {
          return (
            <ListGroup
              className='patient-list'
              as='ul' 
              key={patient.id}
            >
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
            );
          })
          };
        </Col>
      </Row>
    </main>
  );
};

export default PatientList;
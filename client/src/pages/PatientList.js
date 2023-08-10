import React, { useContext, useEffect } from 'react';
import PatientData from '../apis/PatientData';
import { PatientContext } from '../context/PatientContext';

// React Router
import { useNavigate } from 'react-router-dom';

// Bootstrap 
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const PatientList = () => {
  const { 
    patients, 
    setPatients, 
    setSelectedPatient 
  } = useContext(PatientContext);
  let navigate = useNavigate();

  // Fetch all Patients from Database
  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await PatientData.get('/');
        console.log('RESPONSE PATIENT LIST:', response);
        setPatients(response.data.data.patients);
      } catch (error) {
      console.log('Error:', error);
      };
    };
    fetchData();
  }, []);

  // Delete Patient by ID
  const handleDelete = async(patientId) => {
    try {
      await PatientData.delete(`/${patientId}`);
      setPatients(prevPatients => {
        const updatedPatients = prevPatients.filter(
          patient => patient.id !== patientId
        );
        return updatedPatients;
      });
    } catch (error) {
      console.log('Error:', error);
    };
  };

    // Set Selected Patient by ID
    const selectPatient = patientId => {
      console.log('PATIENTID:', patientId);
      const patient = patients.filter(
        patient => patient.id === patientId
        );
      setSelectedPatient(patient[0]);
    };

    const handleSelectPatient = async(patientId) => {
      try {
        const response = await PatientData.get(`/${patientId}`);
        console.log('RESPONSE SELECT:', response);
        selectPatient(patientId);
        navigate(`/patients/${patientId}`);
      } catch (error) {
        console.log('Error:', error);
      };
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
                  action 
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
                    Discharge Patient
                  </Button>
                </ListGroup.Item>
              </ListGroup>
              );
            })
          }
        </Col>
      </Row>
    </main>
  );
};

export default PatientList;
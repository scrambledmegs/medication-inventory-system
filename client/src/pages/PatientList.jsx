import React, { useContext, useEffect } from 'react';
import PatientData from '../apis/PatientData';
import './PatientList.css';

// Context Provider
import { PatientContext } from '../context/PatientContext';

// React Router
import { useNavigate } from 'react-router-dom';

// Bootstrap 
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';

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
        setPatients(response.data.data.patients);
      } catch (error) {
      console.error('Error:', error.message);
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
      console.error('Error:', error.message);
    };
  };

    // Set Selected Patient by ID
    const selectPatient = patientId => {
      const patient = patients.filter(
        patient => patient.id === patientId
        );
      setSelectedPatient(patient[0]);
    };

    const handleSelectPatient = patientId => {
      selectPatient(patientId);
      navigate(`/patients/${patientId}`);
    };

  return (
    <main className='pt-list-container'>
      <h1>Emergency Department</h1>
      {patients && patients.map(patient => {
        return (
            <Accordion key={patient.id}>
              <Accordion.Item eventKey='0'>
                <Row>              
                  <Accordion.Header>
                    <Col>
                      {patient.name}
                    </Col>
                    <Col className='pt-room'>
                      Room: {patient.room_number}
                    </Col>
                  </Accordion.Header>
                </Row>
                  <Accordion.Body>
                    <ListGroup className='pt-list-group'>
                      <ListGroup.Item className='pt-list-item'>
                        DOB: {patient.dob}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        MRN: {patient.mrn}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        Allergies: {patient.allergies}
                      </ListGroup.Item>
                      <ListGroup.Item>
                        {patient.department}
                      </ListGroup.Item>
                      <ListGroup.Item className='btn-sect'>
                        <Button
                          className='discharge-btn'
                          onClick={()=> handleDelete(patient.id)}
                        >
                          Discharge Patient
                        </Button>
                        <Button
                          className='pt-meds-btn'
                          onClick={() => handleSelectPatient(patient.id)}
                        >
                          Medications
                        </Button>
                      </ListGroup.Item>
                    </ListGroup>
                  </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          );
        })
      }
    </main>
  );
};

export default PatientList;
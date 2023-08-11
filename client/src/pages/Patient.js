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

const Patient = () => {
  const {
    selectedPatient, 
    patientMedications, 
    setPatientMedications, 
    selectedMedication, 
    setSelectedMedication
  } = useContext(PatientContext);

  let navigate = useNavigate();

  // Fetch List of Medications by Patient ID
  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await PatientData.get(`/${selectedPatient.id}/medications`);
        console.log('RESPONSE PATIENT MEDICATIONS:', response);
        setPatientMedications(response.data);
      } catch (error) {
        console.log('Error:', error);
      };
    };
    fetchData();
  }, []);

  // Set Selected Medication by ID
  const selectMedication = medicationId => {
    const medication = patientMedications.filter(
      medication => medication.medication_id === medicationId
      );
    setSelectedMedication(medication[0]);
  }

  const handleSelectMedication = (medicationId) => {
    selectMedication(medicationId);
    navigate(
      `/patients/${selectedPatient.id}/${selectedMedication.medication_id}`
      );
  };

  const handleAssignMedication =() => {
    navigate(`/assignMedication`)
  }

  // Map through Patient Medication Object
  const patientMedList = patientMedications.map(patientMedication => {
    console.log('PATIENT MED LIST ID:', patientMedication.medication_id)
    return  (
      <ListGroup.Item
        key={patientMedication.medication_id}
        action 
        onClick = {
          () => handleSelectMedication(patientMedication.medication_id)
        }
      >
        {patientMedication.med_name}
      </ListGroup.Item>
    );
  });

  return (
    <div>
      <Row>
        <Col>
          <h1>{selectedPatient.name}</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          Allergies: {selectedPatient.allergies}
        </Col>
        <Col>
          DOB: {selectedPatient.dob}
        </Col>
        <Col>
          MRN: {selectedPatient.mrn} 
        </Col>
      </Row>
      <Row>
        <Col>
          Room: {selectedPatient.room_number}
        </Col>
        <Col>
          {selectedPatient.department}
        </Col>
      </Row>
      <ListGroup>
        <ListGroup.Item
          as='li' 
          variant='primary'
        >
          Assigned Medications
        </ListGroup.Item>
        {patientMedList}
      </ListGroup>
        <div>
        <Button
          onClick={() => handleAssignMedication()}
        >
          Assign Medication to Patient
        </Button>
        </div>
    </div>
  );
};

export default Patient;
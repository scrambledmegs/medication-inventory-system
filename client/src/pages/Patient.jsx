import React, { useContext, useEffect } from 'react';
import PatientData from '../apis/PatientData';
import PatientMedicationData from '../apis/PatientMedicationData';

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
        console.error('Error:', error.message);
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

  const handleSelectMedication = medicationId => {
    selectMedication(medicationId);
    navigate(
      `/patients/${selectedPatient.id}/${selectedMedication.medication_id}`
      );
  };

  // Navigate to Assign Medication Form Page
  const handleAssignMedication =() => {
    navigate(`/assignMedication`);
  };

  // Unassign Medication from Patient
  const handleUnassignMed = async(medicationId) => {
    console.log('MEDICATIONID:', medicationId)
    console.log('PATIENTMEDICATIONS:', patientMedications)
    try {
      await PatientMedicationData.delete(`/${selectedPatient.id}/${medicationId}`);
      setPatientMedications(patientMedications.filter(
          patientMedication => patientMedication.medication_id != medicationId
        ));
    } catch (error) {
      console.error('Error:', error.message);
    };
  };

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
      <Button
        onClick={handleAssignMedication}
      >
        Assign Med
      </Button>
      {patientMedications && patientMedications.map(patientMed => {
        return (
          <Accordion key={patientMed.medication_id}>
            <Accordion.Item eventKey="0">
              <Accordion.Header>{patientMed.med_name}</Accordion.Header>
              <Accordion.Body>
                <ListGroup>
                  <ListGroup.Item>
                    Dose: {patientMed.dose}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Form: {patientMed.form}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Frequency: {patientMed.frequency}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Alert: {patientMed.high_alert}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Button
                      onClick={() => handleSelectMedication(patientMed.medication_id)}
                    >
                        More Info
                    </Button>
                    <Button
                      onClick={() => handleUnassignMed(patientMed.medication_id)}
                    >
                      Unassign Medication
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          );
        })
      }
    </div>
  );
};

export default Patient;
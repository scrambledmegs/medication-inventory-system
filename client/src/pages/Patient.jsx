import React, { useContext, useEffect } from 'react';
import PatientData from '../apis/PatientData';
import PatientMedicationData from '../apis/PatientMedicationData';
import './Patient.css'

// Context Provider
import { PatientContext } from '../context/PatientContext';

// React Router
import { useNavigate } from 'react-router-dom';

// Bootstrap
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
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
    <main className='patient-container'>
      <h1>{selectedPatient.name}</h1>
      <Row className='assign-row'>
        <button
          className='assign-btn'
          onClick={handleAssignMedication}
        >
          Assign Med
        </button>
      </Row>
      <div className='pt-list-container'>
        {patientMedications && patientMedications.map(patientMed => {
          return (
            <div>
            <Accordion
              key={patientMed.medication_id}
              className='pt-list-accordion'
            >
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
                    <ListGroup.Item className='btn-sect'>
                      <Button
                        className='remove-discon-btn'
                        onClick={() => handleSelectMedication(patientMed.medication_id)}
                      >
                        Remove Med
                      </Button>
                      <Button
                        className='remove-discon-btn'
                        onClick={() => handleUnassignMed(patientMed.medication_id)}
                      >
                        Discontinue Medication
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            </div>
            );
          })
        }
      </div>
    </main>
  );
};

export default Patient;
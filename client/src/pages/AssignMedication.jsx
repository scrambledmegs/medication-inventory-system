import React, { useEffect, useState, useContext} from 'react';
import PatientData from '../apis/PatientData';
import MedicationData from '../apis/MedicationData';
import PatientMedicationData from '../apis/PatientMedicationData';
import './AssignMedication.css';

// Context Provider
import { PatientContext } from '../context/PatientContext';
import { MedicationContext } from '../context/MedicationContext';

// Bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

const AssignMedication = () => {
  const { patients, setPatients } = useContext(PatientContext);
  const { medications, setMedications } = useContext(MedicationContext);
  const [selectedPatientName, setSelectedPatientName] = useState('');
  const [selectedMedicationName, setSelectedMedicationName] = useState('');

  // Fetch Medication and Patient Data
  useEffect(() => {
    const fetchData = async() => {
      try {
        const response = await PatientData.get('/');
        setPatients(response.data.data.patients);
      } catch (error) {
        console.error('Error:', error.message);
      };
      try {
        const response = await MedicationData.get('/');
        setMedications(response.data.data.medications);
      } catch (error) {
        console.error('Error:', error.message);
      };
    };
    fetchData();
  }, []);

  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      const selectedPatient = patients.find(
        patient => patient.name === selectedPatientName
      );
      const selectedMedication = medications.find(
          medication => medication.med_name === selectedMedicationName
        );
      if (!selectedPatient || !selectedMedication) {
        console.error('Patient and/or medication not found.');
        return;
      };
      await PatientMedicationData.post('/', {
        patient_id: selectedPatient.id,
        medication_id: selectedMedication.id
      });
      setSelectedPatientName('');
      setSelectedMedicationName('');
    } catch (error) {
      console.error('Error', error.message);
    };
  };

  return (
    <main className='assign-container'>
      <h1>Assign Medication</h1>
      <Form
        className='assign-form'
        onSubmit={handleSubmit}
      >
        <Form.Group
          className='mb-3'
          controlId='patientName'
        >
          <Form.Label>Patient Name:</Form.Label>
          <Form.Control 
            type='text'
            placeholder='ex: Ryan Atwood'
            value={selectedPatientName}
            onChange={e => setSelectedPatientName(e.target.value)}
          />
        </Form.Group>
        <Form.Group
          className='mb-3'
          controlId='medicationName'
        >
          <Form.Label>Medication Name:</Form.Label>
          <Form.Control 
            type='text'
            placeholder='ex: Zofran'
            value={selectedMedicationName}
            onChange={e => setSelectedMedicationName(e.target.value)}
          />
        </Form.Group>
        <Row className='submit-row'>
          <Button
            className='assign-submit-btn'
            variant='primary'
            type='submit'
          >
            Submit
          </Button>
        </Row>
      </Form>
    </main>
  );
};

export default AssignMedication;
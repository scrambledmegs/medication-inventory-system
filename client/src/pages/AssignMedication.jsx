import React, { useEffect, useState, useContext} from 'react';
import PatientData from '../apis/PatientData';
import MedicationData from '../apis/MedicationData';
import PatientMedicationData from '../apis/PatientMedicationData';
import { PatientContext } from '../context/PatientContext';
import { MedicationContext } from '../context/MedicationContext';

// Bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

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
        console.error('Error:', error);
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
    <main>
      <Form
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
        <Button
          variant='primary'
          type='submit'
        >
          Assign Medication
        </Button>
      </Form>
    </main>
  );
};

export default AssignMedication;
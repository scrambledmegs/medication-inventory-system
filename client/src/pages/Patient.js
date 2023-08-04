import React, { useContext, useEffect } from 'react';
import PatientData from '../apis/PatientData';
import { PatientContext } from '../context/PatientContext';

// Bootstrap
import ListGroup from 'react-bootstrap/ListGroup';

// React Router
import { useNavigate } from 'react-router-dom';

const Patient = () => {
  const {
    selectedPatient, 
    patientMedications, 
    setPatientMedications, 
    selectedMedication, 
    setSelectedMedication 
  } = useContext(PatientContext);
  let navigate = useNavigate();

  // Fetch List of Meds by Patient ID
  useEffect(() => {
    PatientData.get(`http://localhost:4000/patients/${selectedPatient.id}/medications`)
      .then(response => {
        console.log('RESPONSE MEDICATIONS:', response);
        setPatientMedications(response.data);
      });
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

  const medications = patientMedications.map(medication => {
    return  (
      <ListGroup.Item
        action onClick = {
          () => handleSelectMedication(medication.medication_id)
        }
      >
        {medication.med_name}
      </ListGroup.Item>
    );
  });

  return (
    <div>
      <h1>Patient</h1>
        {selectedPatient.name}
        <br />
        {selectedPatient.mrn} 
        <br />
        {selectedPatient.dob}
        <br />
        {selectedPatient.allergies}
        <br />
        {selectedPatient.room_number}
        <br />
        {selectedPatient.department}
        <br />
      <h2>Medications</h2>
        <ListGroup>
          {medications}
        </ListGroup>
    </div>
  );
};

export default Patient;
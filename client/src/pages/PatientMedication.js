import React, { useContext } from 'react';
import { PatientContext } from '../context/PatientContext';

const PatientMedication = () => {
  const { selectedMedication } = useContext(PatientContext)

  return (
    <div>
      <h1>Patient Medication</h1>
      {selectedMedication.med_name}
    </div>
  );
};

export default PatientMedication;
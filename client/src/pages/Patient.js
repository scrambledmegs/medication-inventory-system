import React, { useContext } from 'react';
import { PatientContext } from '../context/PatientContext';

const Patient = () => {
  const { selectedPatient } = useContext(PatientContext);
  console.log('SELECTEDPATIENT:', selectedPatient);

  return (
    <div>Patient
      {selectedPatient.name};
    </div>
  )
}

export default Patient;
import React, { useState, createContext } from 'react';

export const PatientContext = createContext();

export const PatientContextProvider = props => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState({});
  const [patientMedications, setPatientMedications] = useState([]);

  console.log('PATIENTS PC:', patients)
  console.log('SELECTED PATIENT PC:', selectedPatient);
  console.log('PATIENTMEDICATIONS PC:', patientMedications)

  return (
    <PatientContext.Provider 
      value={{
        patients, 
        setPatients, 
        selectedPatient, 
        setSelectedPatient,
        patientMedications,
        setPatientMedications
      }}
    >
      {props.children}
    </PatientContext.Provider>
  );
};
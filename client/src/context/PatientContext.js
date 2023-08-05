import React, { useState, createContext } from 'react';

export const PatientContext = createContext();

export const PatientContextProvider = props => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState({});
  const [patientMedications, setPatientMedications] = useState([]);
  const [selectedMedication, setSelectedMedication] = useState({});

  console.log('PATIENTS PC:', patients)
  console.log('SELECTED PATIENT PC:', selectedPatient);
  console.log('PATIENTMEDICATIONS PC:', patientMedications);
  console.log('SELECTED MEDICATION PC:', selectedMedication);

  const addPatient = patient => {
    setPatients([
      ...patients,
      patient
    ]);
  };

  return (
    <PatientContext.Provider 
      value={{
        patients, 
        setPatients, 
        selectedPatient, 
        setSelectedPatient,
        patientMedications,
        setPatientMedications,
        selectedMedication,
        setSelectedMedication,
        addPatient
      }}
    >
      {props.children}
    </PatientContext.Provider>
  );
};
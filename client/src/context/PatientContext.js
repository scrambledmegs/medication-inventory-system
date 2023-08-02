import React, { useState, createContext } from 'react';

export const PatientContext = createContext();

export const PatientContextProvider = props => {
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);

  console.log('SELECTED PATIENT PC:', selectedPatient);

  return (
    <PatientContext.Provider 
      value={{
        patients, 
        setPatients, 
        selectedPatient, 
        setSelectedPatient}}
    >
      {props.children}
    </PatientContext.Provider>
  )
}
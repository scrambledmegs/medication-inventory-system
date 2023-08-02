import React, { useState, createContext } from 'react';

export const PatientsContext = createContext()

export const PatientsContextProvider = props => {
  const [patients, setPatients] = useState([])
  const [selectedPatient, setSelectedPatient] = useState([])

  return (
    <PatientsContext.Provider 
      value={{
        patients, 
        setPatients, 
        selectedPatient, 
        setSelectedPatient}}
    >
      {props.children}
    </PatientsContext.Provider>
  )
}
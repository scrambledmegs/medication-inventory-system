import React, { createContext, useState }from 'react';

export const MedicationContext = createContext();

export const MedicationContextProvider = props => {
  const [medications, setMedications] = useState([]);
  const [selectMedToUpdate, setSelectMedToUpdate] = useState({})

  console.log('MEDS IN MCP:', medications);
  console.log('SELECT MED TO UPDATE IN MCP:', selectMedToUpdate)

  const addMedication = medication => {
    console.log('MED IN MC:', medication);
    setMedications([
      ...medications,
      medication
    ]);
  };


  return (
    <MedicationContext.Provider
      value={{
        medications,
        setMedications,
        addMedication,
        selectMedToUpdate,
        setSelectMedToUpdate
      }}
    >
      {props.children}
    </MedicationContext.Provider>
  )
}
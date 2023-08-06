import React, { createContext, useState }from 'react';

export const MedicationContext = createContext();

export const MedicationContextProvider = props => {
  const [medications, setMedications] = useState([]);

  console.log('MEDS IN MCP:', medications);

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
        addMedication
      }}
    >
      {props.children}
    </MedicationContext.Provider>
  )
}
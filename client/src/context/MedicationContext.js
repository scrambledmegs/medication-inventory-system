import React, { createContext, useState }from 'react';

export const MedicationContext = createContext();

export const MedicationContextProvider = props => {
  const [medications, setMedications] = useState([])

  console.log('MEDS IN MCP:', medications)


  return (
    <MedicationContext.Provider
      value={{
        medications,
        setMedications,
      }}
    >
      {props.children}
    </MedicationContext.Provider>
  )
}
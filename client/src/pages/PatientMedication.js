import React, { useContext, useEffect, useState } from 'react';
import { PatientContext } from '../context/PatientContext';
import MedicationData from '../apis/MedicationData';

// Bootstrap
import Button from 'react-bootstrap/Button';

const PatientMedication = () => {
  const { 
    selectedMedication, 
    setSelectedMedication 
  } = useContext(PatientContext);

  console.log('SELECTED MEDICATION IN PM:', selectedMedication)

  const updateMedicationQuantity = (e) => {
    console.log('E:', e)
    MedicationData.put(`/${selectedMedication.medication_id}`, selectedMedication).then((resp) => {
      console.log('my data', resp.data);
      setSelectedMedication((prevMed) => {
        console.log(prevMed)
        return {
          ...prevMed,
          quantity: selectedMedication.quantity -1
        };
      });
    });
  };

  return (
    <div>
      <h1>Patient Medication</h1>
      {selectedMedication.med_name}
      <br />
      {selectedMedication.quantity}
      <br />
      <Button 
        onClick={() => updateMedicationQuantity()}
      >
        Remove Medication
      </Button>
    </div>
  );
};

export default PatientMedication;

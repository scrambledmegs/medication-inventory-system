import React, { useContext, useState } from 'react';
import { PatientContext } from '../context/PatientContext';
import MedicationData from '../apis/MedicationData';

// Bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const PatientMedication = () => {
  const { 
    selectedMedication, 
    setSelectedMedication 
  } = useContext(PatientContext);

  const [lowStockAlert, setLowStockAlert] = useState(false)

  // Functions to display/disable modal alert
  const handleAlertClose = () => setLowStockAlert(false)
  const handleAlertShow = () => setLowStockAlert(true)

  console.log('SELECTED MEDICATION IN PM:', selectedMedication);

  const updateMedicationQuantity = () => {
    MedicationData.put(`/${selectedMedication.medication_id}`, selectedMedication)
      .then(response => {
        console.log('my data', response.data);
        setSelectedMedication(prevMed => {
          console.log(prevMed);
          return {
            ...prevMed,
            quantity: selectedMedication.quantity -1
          };
        });
        console.log('QUANTITY AFTER RETURN:', selectedMedication.quantity);
      })
      .then(() => {
        if (selectedMedication.quantity <=5) {
          handleAlertShow();
        } else {
          handleAlertClose();
        };
      });
  };

  return (
    <div>
      <h1>Patient Medication</h1>
      {selectedMedication.med_name}
      <br />
      <p>Medication Inventory: {selectedMedication.quantity}</p>
      <br />
      <Button 
        onClick={() => updateMedicationQuantity()}
        disabled={selectedMedication.quantity == 0 ? true : false}
      >
        Remove Medication
      </Button>
      <Modal
        show={lowStockAlert}
        onHide={handleAlertClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Low Inventory Alert</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Pharmacy has been notified of low inventory and will restock the floor shortly.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleAlertClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PatientMedication;
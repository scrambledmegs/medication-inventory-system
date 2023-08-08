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
  const [button, setButton] = useState(false)

  const handleAlertClose = () => setLowStockAlert(false)
  const handleAlertShow = () => setLowStockAlert(true)

  const buttonOn = () => setButton(false)
  const buttonOff = () => setButton(true)

  console.log('SELECTED MEDICATION IN PM:', selectedMedication);

  const updateMedicationQuantity = () => {
    MedicationData.patch(`/${selectedMedication.medication_id}`, selectedMedication)
      .then((resp) => {
        console.log('my data', resp.data);
        setSelectedMedication((prevMed) => {
          console.log(prevMed);
          console.log('QUANTITY BEFORE RETURN:',selectedMedication.quantity);
          return {
            ...prevMed,
            quantity: selectedMedication.quantity -1
          };
        });
        console.log('QUANTITY AFTER RETURN:', selectedMedication.quantity);
      });
      if (selectedMedication.quantity <= 5) {
        handleAlertShow();
        buttonOn();
      } else if (selectedMedication.quantity > 5) {
        handleAlertClose();
        buttonOn();
      } if (selectedMedication.quantity <= 0) {
        buttonOff();
      }
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
        disabled={button}
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

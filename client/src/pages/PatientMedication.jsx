import React, { useContext, useState } from 'react';
import MedicationData from '../apis/MedicationData';
import './PatientMedication.css';

// Context Provider
import { PatientContext } from '../context/PatientContext';

// Bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';

const PatientMedication = () => {
  const { 
    selectedMedication, 
    setSelectedMedication 
  } = useContext(PatientContext);

  const [lowStockAlert, setLowStockAlert] = useState(false);

  // Functions to display/disable modal alert
  const handleAlertClose = () => setLowStockAlert(false);
  const handleAlertShow = () => setLowStockAlert(true);

  const updateMedicationQuantity = () => {
    MedicationData.put(`/${selectedMedication.medication_id}`, selectedMedication)
      .then(response => {
        setSelectedMedication(prevMed => {
          console.log(prevMed);
          return {
            ...prevMed,
            quantity: selectedMedication.quantity - 1
          };
        });
      })
      .then(() => {
        if (selectedMedication.quantity <= 5) {
          handleAlertShow();
        } else {
          handleAlertClose();
        };
      });
  };

  return (
    <main className='pt-med-container'>
      <Card>
        <Card.Header as='h1'>
          {selectedMedication.med_name}
        </Card.Header>
        <Card.Body>
          <Card.Title>
            {selectedMedication.dose} {selectedMedication.form}
          </Card.Title>
          <Card.Text>
            Inventory: {selectedMedication.quantity}
          </Card.Text>
          <Button
            className='remove-med-btn'
            onClick={() => updateMedicationQuantity()}
            disabled={selectedMedication.quantity == 0 ? true : false}
          >
            Remove Medication
          </Button>
        </Card.Body>
      </Card>
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
          <Button 
            className='close-btn'
            onClick={handleAlertClose}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
};

export default PatientMedication;
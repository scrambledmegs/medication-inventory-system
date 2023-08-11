import React, { useContext, useEffect, useState } from 'react';
import MedicationData from '../apis/MedicationData';
import { MedicationContext } from '../context/MedicationContext';

// React Router
import { useNavigate } from 'react-router-dom';

// Bootstrap
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';

const MedicationList = () => {
  const { 
    medications, 
    setMedications, 
    setSelectMedToUpdate
  } = useContext(MedicationContext);
  let navigate = useNavigate()

  // Fetch all Medications from Database
    useEffect(() => {
      const fetchData = async() => {
        try {
          const response = await MedicationData.get('/');
          setMedications(response.data.data.medications);
        } catch (error) {
          console.log('Error:', error);
        }
      }
      fetchData();
    }, []);

  // Delete Medication
  const handleDelete = async(medicationId) => {
    try {
      await MedicationData.delete(`/${medicationId}`);
      setMedications(prevMedications => {
        const updatedMedications = prevMedications.filter(medication => medication.id !== medicationId);
        return updatedMedications;
      });
    } catch (error) {
      console.log('Error:', error);
    };
  };

  // Select Medication by ID
  const selectMed = (medicationId) => {
    console.log('MED ID:', medicationId)
    const medication = medications.filter(medication => medication.id === medicationId);
    setSelectMedToUpdate(medication[0]);
  }
  // Fetch Data by ID and Navigate to Update Quantity Page
  const handleMedicationUpdate = async(medicationId) => {
    try {
      const response = await MedicationData.get(`/${medicationId}`);
      console.log('UPDATE RESPONSE SELECT:', response.data[0]);
      selectMed(medicationId);
      navigate(`/medications/${medicationId}/update`);
    } catch (error) {
      console.log('Error:', error);
    };
  };

  return (
    <main>
      <h1>Medication List</h1>
      {medications && medications.map(medication => {
        return (
          <ListGroup 
            as='ul' 
            key={medication.id}
          >
            <ListGroup.Item 
              as='li' 
              variant='primary'
            >
              {medication.med_name}
            </ListGroup.Item>
            <ListGroup.Item as='li'>
              Dose: {medication.dose}
            </ListGroup.Item>
            <ListGroup.Item as='li'>
              Form: {medication.form}
            </ListGroup.Item>
            <ListGroup.Item as='li'>
              Frequency: {medication.frequency}
            </ListGroup.Item>
            <ListGroup.Item as='li'>
              Quantity: {medication.quantity}
            </ListGroup.Item>
            <ListGroup.Item as='li'>
              {medication.high_alert}
            </ListGroup.Item>
            <ListGroup.Item as='li'>
              <Button
                onClick={() => handleDelete(medication.id)}
              >
                Delete Medication
              </Button>
              <Button
                onClick={() => handleMedicationUpdate(medication.id)}
              >
                Update Medication Inventory
              </Button>
            </ListGroup.Item>
          </ListGroup>
        )}
      )}
    </main>
  );
};

export default MedicationList;
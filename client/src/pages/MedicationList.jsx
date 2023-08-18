import React, { useContext, useEffect } from 'react';
import MedicationData from '../apis/MedicationData';
import './MedicationList.css';

// Context Provider
import { MedicationContext } from '../context/MedicationContext';

// React Router
import { useNavigate } from 'react-router-dom';

// Bootstrap
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';

const MedicationList = () => {
  const { 
    medications, 
    setMedications, 
    setSelectMedToUpdate
  } = useContext(MedicationContext);
  let navigate = useNavigate();

  // Fetch all Medications from Database
    useEffect(() => {
      const fetchData = async() => {
        try {
          const response = await MedicationData.get('/');
          setMedications(response.data.data.medications);
        } catch (error) {
          console.error('Error:', error.message);
        };
      };
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
      console.error('Error:', error.message);
    };
  };

  // Select Medication by ID
  const selectMed = (medicationId) => {
    const medication = medications.filter(medication => medication.id === medicationId);
    setSelectMedToUpdate(medication[0]);
  }
  // Fetch Data by ID and Navigate to Update Quantity Page
  const handleMedicationUpdate = async(medicationId) => {
    try {
      const response = await MedicationData.get(`/${medicationId}`);
      selectMed(medicationId);
      navigate(`/medications/${medicationId}/update`);
    } catch (error) {
      console.error('Error:', error.message);
    };
  };

  return (
    <main className='med-list-container'>
      <h1>Medications</h1>
      {medications && medications.map(medication => {
        return (
          <Accordion key={medication.id}>
            <Accordion.Item eventKey='0'>
              <Accordion.Header>
                {medication.med_name}
              </Accordion.Header>
              <Accordion.Body>
                <ListGroup>
                  <ListGroup.Item>
                    Dose: {medication.dose}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Form: {medication.form}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Frequency: {medication.frequency}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Alert: {medication.high_alert}
                  </ListGroup.Item>
                  <ListGroup.Item>
                    Inventory Count: {medication.quantity}
                  </ListGroup.Item>
                  <ListGroup.Item className='btn-sect'>
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
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        );
      })}
    </main>
  );
};

export default MedicationList;
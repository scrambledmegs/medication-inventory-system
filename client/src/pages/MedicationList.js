import React, { useContext, useEffect } from 'react';
import MedicationData from '../apis/MedicationData';
import { MedicationContext } from '../context/MedicationContext';

// Bootstrap
import ListGroup from 'react-bootstrap/ListGroup';

const MedicationList = () => {
  const { medications, setMedications} = useContext(MedicationContext);

  useEffect(() => {
    MedicationData.get('/')
      .then(response => {
        console.log('RESPONSE MEDICATION LIST:', response)
        setMedications(response.data.data.medications)
      })
  },[])

  return (
    <main>
      <h1>Medication List</h1>
      {medications && medications.map(medication => {
        return (
          <ListGroup as='ul' key={medication.id}>
              <ListGroup.Item 
                as='li' 
                variant='primary'
                action
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
              <ListGroup.Item as='li'></ListGroup.Item>
          </ListGroup>
        )}
      )}
    </main>
  )
}

export default MedicationList;
import React, { useContext, useState } from 'react';
import MedicationData from '../apis/MedicationData';
import './UpdateInventoryForm.css'

// Context Provider
import { MedicationContext } from '../context/MedicationContext';

// Bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';

const UpdateQuantity = () => {
  const { selectMedToUpdate } = useContext(MedicationContext);
    const [quantity, setQuantity] = useState('');

  const updateMedicationQuantity = async(event) => {
    event.preventDefault();
    try {
      const response = await MedicationData.patch(`/${selectMedToUpdate.id}`, {'quantity': quantity});
      setQuantity('');
    } catch (error) {
      console.error('Error:', error);
    };
  };

  return (
    <main className='update-container'>
      <h1>Update {selectMedToUpdate.med_name} Quantity</h1>
      <Form
        className='update-inventory-form'
        onSubmit={updateMedicationQuantity}
      >
        <Form.Group className="mb-3" controlId="updateQuantity">
          <Form.Label>Inventory Count:</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="ex: 20"
            value={quantity}
            onChange={event => setQuantity(event.target.value)}
          />
        </Form.Group>
        <Row className='submit-row'>
          <Button
            variant="primary" 
            type="submit"
          >
            Update
          </Button>
        </Row>
      </Form>
    </main>
  );
};

export default UpdateQuantity;
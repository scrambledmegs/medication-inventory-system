import React, { useContext, useState } from 'react';
import { MedicationContext } from '../context/MedicationContext';
import MedicationData from '../apis/MedicationData';

// Bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const UpdateQuantity = () => {
  const { selectMedToUpdate } = useContext(MedicationContext);
    const [quantity, setQuantity] = useState('');


  console.log('SELECTED MED TO UPDATE:', selectMedToUpdate)
  console.log('SELECTED MED TO UPDATE ID:', selectMedToUpdate.id)
  console.log('SELECTED MED TO UPDATE QUANT:', selectMedToUpdate.quantity)
  console.log('QUANT STATE:', quantity)

  const updateMedicationQuantity = async(event) => {
    event.preventDefault();
    try {
      const response = await MedicationData.patch(`/${selectMedToUpdate.id}`, {'quantity': quantity});
      console.log('UPDATE MED QUANT DATA:', response.data);
      setQuantity('');
    } catch (error) {
      console.log('Error:', error);
    };
  };

  return (
    <div>
      <h1>Update Quantity</h1>
      <Form
        onSubmit={updateMedicationQuantity}
      >
      <Form.Group className="mb-3" controlId="updateQuantity">
        <Form.Label>{selectMedToUpdate.med_name} Inventory:</Form.Label>
        <Form.Control 
          type="text" 
          placeholder="ex: 20"
          value={quantity}
          onChange={event => setQuantity(event.target.value)}
        />
      </Form.Group>
      <Button
        variant="primary" 
        type="submit"
      >
        Update
      </Button>
    </Form>
    </div>
  );
};

export default UpdateQuantity;
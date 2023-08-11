import React from 'react';

// Bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AssignMedication = () => {
  return (
    <>
      <Form>
        <Form.Group className="mb-3" controlId="patientName">
          <Form.Label>Patient Name:</Form.Label>
          <Form.Control type="text" placeholder="ex: Ryan Atwood" />
        </Form.Group>
        <Form.Group className="mb-3" controlId="medicationName">
          <Form.Label>Medication:</Form.Label>
          <Form.Control type="text" placeholder="ex: Morphine" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Assign Medication
        </Button>
      </Form>
    </>
  )
}

export default AssignMedication
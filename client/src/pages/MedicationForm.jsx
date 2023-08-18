import React, { useContext, useState } from 'react';
import MedicationData from '../apis/MedicationData';
import './MedicationForm.css'

// Context Provider
import { MedicationContext } from '../context/MedicationContext';

// Bootstrap
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const MedicationForm = () => {
  const { addMedication } = useContext(MedicationContext);
  const [medName, setMedName] = useState('');
  const [dose, setDose] = useState('');
  const [form, setForm] = useState('');
  const [frequency, setFrequency] = useState('');
  const [quantity, setQuantity] = useState('');
  const [highAlert, setHighAlert] = useState('');
  const [validated, setValidated] =useState(false);
  const [submitMessage, setSubmitMessage] = useState(false);


  // Functions to show or hide modal after submitting medication data
  const submitMessageShow = () => setSubmitMessage(true);
  const submitMessageHide = () => setSubmitMessage(false);

  // Handles form validity
  const handleSubmit = event => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      submitMessageHide();
    }
    setValidated(true);
    enterNewMedication(event);
  }

  // Sends new medication data to medication table
  const enterNewMedication = async(event) => {
    event.preventDefault();
    try {
      const response = await MedicationData.post('/', {
        med_name: medName,
        dose,
        form,
        frequency,
        quantity,
        high_alert: highAlert
      });
      addMedication(response.data.data.medication);
      submitMessageShow();
      setMedName('');
      setDose('');
      setForm('');
      setFrequency('');
      setQuantity('');
      setHighAlert('');
    } catch (error) {
      console.error('Error:', error.message);
    };
  };

  return (
    <main className='med-form'>
      <h1 className='page-heading'>Add Medication</h1>
      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}>
        <Row>
          <Col>
            <Form.Group className='mb-3' controlId='name'>
              <Form.Label>Medication Name:</Form.Label>
              <Form.Control
                required
                type='text'
                placeholder='ex: Zofran'
                value={medName}
                onChange={e => setMedName(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3' controlId='dose'>
              <Form.Label>Dose:</Form.Label>
              <Form.Control
                required
                type='text'
                placeholder='ex: 4mg'
                value={dose}
                onChange={e => setDose(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3' controlId='form'>
              <Form.Label>Form:</Form.Label>
              <Form.Control
                required
                type='text'
                placeholder='ex: IV'
                value={form}
                onChange={e => setForm(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className='mb-3' controlId='frequency'>
              <Form.Label>Frequency:</Form.Label>
              <Form.Control
                required
                type='text'
                placeholder='ex: q 4 hrs'
                value={frequency}
                onChange={e => setFrequency(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3' controlId='quantity'>
              <Form.Label>Quantity:</Form.Label>
              <Form.Control
                required
                type='text'
                placeholder='ex: 10'
                value={quantity}
                onChange={e => setQuantity(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3' controlId='alert'>
              <Form.Label>Alert:</Form.Label>
              <Form.Control
                as='textarea'
                rows = {2}
                placeholder='ex: Risk of prolonged QT interval.'
                value={highAlert}
                onChange={e => setHighAlert(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row
          className='btn-row'
        >
          <Button
            variant='primary'
            type='submit'
          >
            Add Medication
          </Button>
        </Row>
      </Form>
      <Modal
        show={submitMessage}
        onHide={submitMessageHide}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Medication successfully entered into system.
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary"
            onClick={submitMessageHide}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
};

export default MedicationForm;
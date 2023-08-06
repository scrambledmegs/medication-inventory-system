import React, { useContext, useState } from 'react';
import { PatientContext } from '../context/PatientContext';
import PatientData from '../apis/PatientData';

// Bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const AdmitPatient = () => {
  const { addPatient } = useContext(PatientContext)
  const [name, setName] = useState('')
  const [mrn, setMrn] = useState('')
  const [dob, setDob] = useState('')
  const [allergies, setAllergies] = useState('')
  const [roomNumber, setRoomNumber] = useState('')
  const [department, setDepartment] = useState('')
  const [submitMessage, setSubmitMessage] = useState(false);
  const [validated, setValidated] = useState(false);


  const submitMessageShow = () => setSubmitMessage(true)
  const submitMessageHide = () => setSubmitMessage(false)

  // *** Need to fix ***
  const handleSubmit = async(event) => {
    event.preventDefault()
    try {
      const response = await PatientData.post('/', {
        name,
        mrn,
        dob,
        allergies,
        room_number: roomNumber,
        department
      });
      submitMessageShow()
      console.log('ADMIT RESPONSE:', response.data.data)
      addPatient(response.data.data.patient)
      setName('')
      setMrn('')
      setDob('')
      setAllergies('')
      setRoomNumber('')
      setDepartment('')
    } catch (err) {
      console.log('Error:', err);
      submitMessageHide()
    }
  };

  return (
    <main>
      <h1>New Patient Admit</h1>
      <Form 
        onSubmit={handleSubmit}
        noValidate
        validated={validated}
      >
        <Row>
          <Col>
            <Form.Group className='mb-3' controlId='name'>
              <Form.Label>Patient Name:</Form.Label>
              <Form.Control
                required
                type='text'
                value={name}
                placeholder='Patient Name'
                onChange={e => setName(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3' controlId='mrn'>
              <Form.Label>MRN:</Form.Label>
              <Form.Control
                required
                type='text'
                value={mrn}
                placeholder='MRN'
                onChange={e => setMrn(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className='mb-3' controlId='dob'>
              <Form.Label>Date of Birth:</Form.Label>
              <Form.Control
                required
                type='text'
                value={dob}
                placeholder='ex: 06/14/1991'
                onChange={e => setDob(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3' controlId='allergies'>
              <Form.Label>Allergies:</Form.Label>
              <Form.Control
                required
                type='text'
                value={allergies}
                placeholder='Allergies'
                onChange={e => setAllergies(e.target.value)}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className='mb-3' controlId='roomNumber'>
              <Form.Label>Room Number :</Form.Label>
              <Form.Control
                required
                type='text'
                value={roomNumber}
                placeholder='Room Number'
                onChange={e => setRoomNumber(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className='mb-3' controlId='department'>
              <Form.Label>Department:</Form.Label>
              <Form.Control
                required
                type='text'
                value={department}
                placeholder='ex: Emergency Department'
                onChange={e => setDepartment(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Button
          variant='primary'
          type='submit'
          onClick={submitMessageShow}
        >
          Admit Patient
        </Button>
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
          Patient successfully admitted to system.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={submitMessageHide}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  )
}

export default AdmitPatient
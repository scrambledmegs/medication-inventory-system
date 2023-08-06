import React, { useContext, useState } from 'react';
import { PatientContext } from '../context/PatientContext';
import PatientData from '../apis/PatientData';

// Bootstrap
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const AdmitPatient = () => {
  const { addPatient } = useContext(PatientContext)
  const [name, setName] = useState('')
  const [mrn, setMRN] = useState('')
  const [dob, setDob] = useState('')
  const [allergies, setAllergies] = useState('')
  const [roomNumber, setRoomNumber] = useState('')
  const [department, setDepartment] = useState('')

  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      const response = await PatientData.post('/', {
        name,
        mrn,
        dob,
        allergies,
        room_number: roomNumber,
        department
      });
      console.log('ADMIT RESPONSE:', response.data.data)
      addPatient(response.data.data.patient)
    } catch (err) {
      console.log('Error:', err);
    }
  };

  return (
    <main>
      <h1>Admit Patient</h1>
      <form onSubmit={handleSubmit}>
      <section>
        <h2>Admit Patient</h2>
        <div></div>
          <div>
            <label htmlFor='name'>Patient Name:</label>
            <input 
            name='name' 
            value={name} 
            onChange={e => setName(e.target.value)}> 
            </input>
          </div>
          <div>
            <label htmlFor='mrn'>MRN:</label>
            <input 
            name='mrn' 
            value={mrn} 
            onChange={e=> setMRN(e.target.value)}>
            </input>
          </div>
          <div>
            <label htmlFor='dob'>Date of Birth:</label>
            <input 
            name='dob' 
            value={dob} 
            onChange={e => setDob(e.target.value)}>
            </input>
          </div>
          <div>
            <label htmlFor='allergies'>Allergies:</label>
            <input 
            name='allergies' 
            value={allergies} 
            onChange={e => setAllergies(e.target.value)}>
            </input>
          </div>
          <div>
            <label htmlFor='roomNumber'>Room Number:</label>
            <input 
            name='roomNumber' 
            value={roomNumber} 
            onChange={e => setRoomNumber(e.target.value)}>
            </input>
          </div>
          <div>
            <label htmlFor='department'>Department:</label>
            <input 
            name='department' 
            value={department} 
            onChange={e => setDepartment(e.target.value)}>
            </input>
          </div>
          <button 
          type='submit' 
          >
            Admit Patient
          </button>
        </section>
      </form>
    </main>
  )
}

export default AdmitPatient
require('dotenv').config();
const express = require('express');
const db = require('./db/index');
const app = express();
const port = process.env.PORT || 3005;

// middleware
app.use(express.json());

// create new patient
app.post('/patients', async(req, res) => {
  try {
    const newPatient = await db.query(
      'INSERT INTO patient_information (patient_name, patient_mrn, patient_dob, patient_allergies, room_number, department) VALUES ($1, $2, $3, $4, $5, $6) returning *',
      [req.body.patient_name, req.body.patient_mrn, req.body.patient_dob, req.body.patient_allergies, req.body.room_number, req.body.department]
    );
    console.log(newPatient);
    res.status(201).json(
      {
        status: 'Successfully created new patient!',
        data: {
          patient: newPatient.rows[0]
        }
      }
    );
  } catch (err) {
    console.log(err);
  };
})

// get all patients
app.get('/patients', async(req, res) => {
  try {
    const patients = await db.query(
      'SELECT * FROM patient_information'
    );
    console.log(patients.rows);
    res.status(200).json(
      {
        status: 'Success!',
        results: patients.rows.length,
        data: {
          patients: patients.rows
        }
      }
    );
  } catch (err) {
    console.log(err);
  };
});

// get patient by ID
app.get('/patients/:patientid', async(req, res) => {
  console.log(req.params.patientid)
  try {
    const patient = await db.query(
      'SELECT * FROM patient_information WHERE patient_id = $1',
      [req.params.patientid]
    );
    res.json(patient.rows[0]);
    console.log(patient.rows[0])
  } catch (err) {
    console.log(err);
  };
});

// update patient information
app.put('/patients/:patientid', async(req, res) => {
  try {
    const updatedPatient = await db.query(
      'UPDATE patient_information SET patient_name = $1, patient_mrn = $2, patient_dob = $3, patient_allergies = $4, room_number = $5, department = $6 WHERE patient_id = $7 RETURNING *',
      [req.body.patient_name, req.body.patient_mrn, req.body.patient_dob, req.body.patient_allergies, req.body.room_number, req.body.department, req.params.patientid]
    );
    console.log(updatedPatient);
    res.status(200).json(
      {
        status: 'Successfully updated patient information!',
        data: {
          patient: updatedPatient.rows[0]
        }
      }
    );
  } catch (err) {
    console.log(err);
  };
});

// Listens on port for connections
app.listen(port, () => {
  console.log(`Server listening on Port: ${port}`);
});
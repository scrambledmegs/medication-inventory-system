require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db/index');
const app = express();
const port = process.env.PORT || 4001;

// Middleware
app.use(cors())
app.use(express.json());

// Create New Patient
app.post('/patients', async(req, res) => {
  try {
    const newPatient = await db.query(
      'INSERT INTO patient (name, mrn, dob, allergies, room_number, department) VALUES ($1, $2, $3, $4, $5, $6) returning *',
      [req.body.name, req.body.mrn, req.body.dob, req.body.allergies, req.body.room_number, req.body.department]
    );
    res.status(201).json(
      {
        status: 'Successfully created new patient!',
        data: {
          patient: newPatient.rows[0]
        }
      }
    );
  } catch (err) {
    console.log('Error:', err);
  };
});

// Create New Medication
app.post('/medications', async (req, res) => {
  try {
    const newMedication = await db.query(
      'INSERT INTO medication (med_name, quantity, dose, form, frequency, high_alert) VALUES ($1, $2, $3, $4, $5, $6) returning *',
      [req.body.med_name, req.body.quantity, req.body.dose, req.body.form, req.body.frequency, req.body.high_alert]
    );
    res.status(201).json(
      {
        data: {
          medication: newMedication.rows[0]
        }
      }
    );
  } catch (err) {
    console.log('Error:', err);
  };
});

// Read All Patients
app.get('/patients', async(req, res) => {
  try {
    const patients = await db.query(
      'SELECT * FROM patient;'
    );
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
    console.log('Error:', err);
  };
});

// Read All Medications
app.get('/medications', async(req, res) => {
  try {
    const medications = await db.query(
      'SELECT * FROM medication;'
    );
    res.status(200).json(
      {
        status: 'Success!',
        results: medications.rows.length,
        data: {
          medications: medications.rows
        }
      }
    );
  } catch (err) {
    console.log('Error:', err);
  };
});

// Read Patient by ID
app.get('/patients/:patientid', async(req, res) => {
  try {
    const patient = await db.query(
      `SELECT * FROM patient
      WHERE patient.id = ${req.params.patientid}`
    );
    res.json(patient.rows);
  } catch (err) {
    console.log('Error:', err);
  };
});

// Read Medication by ID
app.get('/medications/:medicationid', async (req, res) => {
  try {
    const medication = await db.query(
      `SELECT * FROM medication 
      WHERE medication.id = ${req.params.medicationid}`
    );
    res.json(medication.rows);
  } catch (err) {
    console.log('Error:', err);
  };
});

// Read list of medications for patient by ID
app.get('/patients/:patientid/medications', async (req, res) => {
  try {
    const patientMedicationList = await db.query (
      `SELECT medication_id, med_name, quantity, dose, form, frequency, high_alert, patient_id
      FROM medication
      INNER JOIN patient_medication
      ON patient_medication.medication_id = medication.id
      INNER JOIN patient
      ON patient.id = patient_medication.patient_id
      WHERE patient.id = ${req.params.patientid}`
    );
    res.json(patientMedicationList.rows);
  } catch (err) {
    console.log('Error:', err)
  };
});

// Update Patient by ID
app.put('/patients/:patientid', async(req, res) => {
  try {
    const updatedPatient = await db.query(
      'UPDATE patient SET name = $1, mrn = $2, dob = $3, allergies = $4, room_number = $5, department = $6 WHERE id = $7 RETURNING *',
      [req.body.name, req.body.mrn, req.body.dob, req.body.allergies, req.body.room_number, req.body.department, req.params.patientid]
    );
    res.status(200).json(
      {
        status: 'Successfully updated patient information!',
        data: {
          patient: updatedPatient.rows[0]
        }
      }
    );
  } catch (err) {
    console.log('Error:', err);
  };
});

// Update Medication by ID
app.put('/medications/:medicationid', async(req, res) => {
  try {
    const updatedMedication = await db.query(
      'UPDATE medication SET med_name = $1, quantity = $2, dose = $3, form = $4, frequency = $5, high_alert = $6 WHERE id = $7 RETURNING *',
      [req.body.med_name, req.body.quantity, req.body.dose, req.body.form, req.body.frequency, req.body.high_alert, req.params.medicationid]
    );
    res.status(200).json(
      {
        status: 'Successfully updated medication information!',
        data: {
          medication: updatedMedication.rows[0]
        }
      }
    );
  } catch (err) {
    console.log('Error:', err);
  };
});

// Delete Patient by ID
app.delete('/patients/:patientid', async(req, res) => {
  try {
    const deletePatient = await db.query(
      'DELETE FROM patient WHERE id = $1',
      [req.params.patientid]
    );
    res.status(204).json(
      {
        status: 'Patient successfully deleted from system.'
      }
    );
  } catch (err) {
    console.log('Error:', err);
  };
});

// Delete Medication by ID
app.delete('/medications/:medicationid', async(req, res) => {
  try {
    const deleteMedication = await db.query(
      'DELETE FROM medication WHERE id = $1',
      [req.params.medicationid]
    );
    res.status(204).json(
      {
        status: 'Patient successfully deleted from system.'
      }
    );
  } catch (err) {
    console.log('Error:', err);
  };
});

// Listens on port for connections
app.listen(port, () => {
  console.log(`Server listening on Port: ${port}`);
});
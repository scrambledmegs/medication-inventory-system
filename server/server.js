require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./db/index');
const app = express();
const port = process.env.PORT || 4001;

// Middleware
app.use(cors());
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
  } catch (error) {
    console.error('Error:', error.message);
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
  } catch (error) {
    console.error('Error:', error.message);
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
  } catch (error) {
    console.error('Error:', error.message);
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
  } catch (error) {
    console.error('Error:', error.message);
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
  } catch (error) {
    console.error('Error:', error.message);
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
  } catch (error) {
    console.error('Error:', error.message);
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
  } catch (error) {
    console.error('Error:', error.message)
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
  } catch (error) {
    console.error('Error:', error.message);
  };
});

// Update Medication by ID
app.put('/medications/:medicationid', async(req, res) => {
  try {
    const testing = req.body.quantity -1
    const updatedMedication = await db.query(
      'UPDATE medication SET med_name = $1, quantity = $2, dose = $3, form = $4, frequency = $5, high_alert = $6 WHERE id = $7 RETURNING *',
      [req.body.med_name, testing, req.body.dose, req.body.form, req.body.frequency, req.body.high_alert, req.params.medicationid]
    );
    res.status(200).json(
      {
        status: 'Successfully updated medication information!',
        data: {
          medication: updatedMedication.rows[0]
        }
      }
    );
  } catch (error) {
    console.error('Error:', error.message);
  };
});

// Patch Medication by ID
app.patch('/medications/:medicationid', async(req, res) => {
  try {
    const medication = await db.query(
      `SELECT * FROM medication 
      WHERE medication.id = ${req.params.medicationid}`
    );

    const updateData = [];
    const object = req.body;
    let query = 'UPDATE medication SET';

    for (const key in object) {
      console.log('KEY:', key);
      if (object[key]){ 
        updateData.push(object[key]);
        query = query + ` ${key} = $${updateData.length},`
        console.log(`KEY:${key} = $${updateData.length}`)
      };
    };
    
    query = query.substring(0, query.length - 1) + ` WHERE id = ${req.params.medicationid} RETURNING *`;
    console.log(updateData, query);

    const updatedMedication = await db.query(query, updateData);
    res.status(200).json(
      {
        status: 'Successfully updated medication information!',
        data: {
          "medications":updatedMedication.rows[0]
        }
      }
    );
  } catch (error) {
    console.error('Error:', error.message);
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
  } catch (error) {
    console.error('Error:', error.message);
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
  } catch (error) {
    console.error('Error:', error.message);
  };
});

// Create new entry into patient_medication join table
app.post('/patientmedication', async(req, res) => {
  try {
    const newPatientMedication = await db.query(
      'INSERT INTO patient_medication (patient_id, medication_id) VALUES ($1, $2) returning *',
      [req.body.patient_id, req.body.medication_id]
    );
    res.status(201).json(
      {
        status: 'Successfully assigned medication to patient!',
        data: {
          patient: newPatientMedication.rows[0]
        }
      }
    );
  } catch (error) {
    console.error('Error:', error.message);
  };
});

// Read patient_medication join table
app.get('/patientmedication', async(req, res) => {
  try {
    const patientMedications = await db.query(
      'SELECT * FROM patient_medication;'
    );
    res.status(200).json(
      {
        status: 'Success!',
        results: patientMedications.rows.length,
        data: {
          medications: patientMedications.rows
        }
      }
    );
  } catch (error) {
    console.error('Error:', error.message);
  };
});

// Delete Medication Assigned to Patient
app.delete('/patientmedication/:patientid/:medicationid', async(req, res) => {
  try {
    const deleteMedicationAssignment = await db.query(
      'DELETE FROM patient_medication WHERE patient_id = $1 AND medication_id = $2',
      [req.params.patientid, req.params.medicationid]
    );
    res.status(200).json(
      {
        status: 'Unassigned Medication from patient.'
      }
    );
  } catch (error) {
    console.error('Error:', error.message);
  };
});

// Listens on port for connections
app.listen(port, () => {
  console.log(`Server listening on Port: ${port}`);
});
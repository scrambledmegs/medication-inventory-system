require('dotenv').config();
const express = require('express');
const db = require('./db/index');
const app = express();
const port = process.env.PORT || 3005;

// middleware
app.use(express.json());

// get all patients
app.get('/patients', async(req, res) => {
  try {
    const patients = await db.query(
      'SELECT * FROM patient_information'
    );
    console.log(patients.rows)
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
    console.log(err)
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
  }
});

// Listens on port for connections
app.listen(port, () => {
  console.log(`Server listening on Port: ${port}`);
});
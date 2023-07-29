CREATE TABLE patient_data (
    patient_id INT GENERATED ALWAYS AS IDENTITY,
    patient_name VARCHAR(50) NOT NULL,
    patient_mrn VARCHAR(7) NOT NULL,
    patient_dob VARCHAR(10) NOT NULL,
    patient_allergies VARCHAR(100) NOT NULL,
    room_number INT NOT NULL,
    department VARCHAR(50) NOT NULL,
    PRIMARY KEY(patient_id)
);

CREATE TABLE medication_data (
    medication_id INT GENERATED ALWAYS AS IDENTITY,
    medication_name VARCHAR(100) NOT NULL,
    medication_dose VARCHAR(100) NOT NULL,
    medication_form VARCHAR(100) NOT NULL,
    medication_frequency VARCHAR(100) NOT NULL,
    high_alert VARCHAR(100),
    PRIMARY KEY(medication_id)
);

ALTER TABLE medication_data
ADD CONSTRAINT fk_patient
    FOREIGN KEY(patient_id)
        REFERENCES patient_data(patient_id);

SELECT * FROM patient_data 
INNER JOIN medication_data 
ON patient_data.patient_id = medication_data.patient_id;
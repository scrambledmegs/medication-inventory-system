CREATE TABLE patient (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    name VARCHAR(50) NOT NULL,
    mrn VARCHAR(7) NOT NULL,
    dob VARCHAR(10) NOT NULL,
    allergies VARCHAR(100) NOT NULL,
    room_number INT NOT NULL,
    department VARCHAR(50) NOT NULL
);

CREATE TABLE medication (
    id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    med_name VARCHAR(100) NOT NULL,
    quantity INT NOT NULL,
    dose VARCHAR(100) NOT NULL,
    form VARCHAR(100) NOT NULL,
    frequency VARCHAR(100) NOT NULL,
    high_alert VARCHAR(100)
);

CREATE TABLE patient_medication (
    patient_id INT,
    FOREIGN KEY (patient_id) REFERENCES patient(id) ON DELETE CASCADE,
    medication_id INT,
    FOREIGN KEY (medication_id) REFERENCES medication(id) ON DELETE CASCADE,
    PRIMARY KEY (patient_id, medication_id)
);
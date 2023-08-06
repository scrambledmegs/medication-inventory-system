import React, { useState } from 'react';
import Home from './pages/Home';
import PatientList from './pages/PatientList';
import Patient from './pages/Patient';
import AdmitPatient from './pages/AdmitPatient';
import PatientMedication from './pages/PatientMedication';
import MedicationList from './pages/MedicationList';
import { PatientContextProvider } from './context/PatientContext';
import './App.css';

// React Router
import { Link, Route, Routes } from 'react-router-dom';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import bootstrap from 'bootstrap';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { MedicationContextProvider } from './context/MedicationContext';


function App() {

  return (
    <div className='App'>
    <PatientContextProvider >
      <MedicationContextProvider>
      <Container>
        <Row xs={1}>
          <Col className='testing'>
            <Navbar 
              expand="lg" 
              className="bg-body-tertiary" 
              data-bs-theme="dark"
            >
              <Container>
              <Navbar.Brand>Meds</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to='/patients'>Patient List</Nav.Link>
                    <NavDropdown title="More Options" id="basic-nav-dropdown">
                      <NavDropdown.Item 
                        as={Link}
                        to='/admitPatient'
                      >
                        Admit Patient
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item 
                        as={Link}
                        to='/medications'
                      >
                        Medication List
                      </NavDropdown.Item>
                    </NavDropdown>
                  </Nav>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          </Col>
        </Row>
        <Routes> 
          <Route path='/' element={<Home />} />
          <Route path='/admitPatient' element={<AdmitPatient />} />
          <Route path='/patients' element={<PatientList />} />
          <Route path='/patients/:patientid' element={<Patient />} />
          <Route path = '/patients/:patientid/:medicationid' element={<PatientMedication />} />
          <Route path='/medications' element={<MedicationList />} />
        </Routes>
      </Container>
      </MedicationContextProvider>
    </PatientContextProvider>
    </div>
  );
};

export default App;

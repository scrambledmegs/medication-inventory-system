import React from 'react';
import Home from './pages/Home';
import NavigationBar from './components/NavigationBar';
import PatientList from './pages/PatientList';
import Patient from './pages/Patient';
import AdmitPatient from './pages/AdmitPatient';
import PatientMedication from './pages/PatientMedication';
import MedicationList from './pages/MedicationList';
import AssignMedication from './pages/AssignMedication';
import UpdateInventoryForm from './pages/UpdateInventoryForm';
import MedicationForm from './pages/MedicationForm';
import './App.css';

// Context Providers
import { PatientContextProvider } from './context/PatientContext';
import { MedicationContextProvider } from './context/MedicationContext';

// React Router
import { Route, Routes } from 'react-router-dom';

// Bootstrap
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function App() {

  return (
    <main className='App'>
      <PatientContextProvider >
        <MedicationContextProvider>
          <Container>
            <Row className='nav-row'>
              <NavigationBar />
            </Row>
            <Routes> 
              <Route path='/' element={<Home />} />
              <Route path='/admitPatient' element={<AdmitPatient />} />
              <Route path='/patients' element={<PatientList />} />
              <Route path='/patients/:patientid' element={<Patient />} />
              <Route 
                path = '/patients/:patientid/:medicationid' 
                element={<PatientMedication />} 
              />
              <Route path='/medications' element={<MedicationList />} />
              <Route path ='/medicationForm' element={<MedicationForm />} />
              <Route 
                path='/medications/:medicationid/update' 
                element={<UpdateInventoryForm />} 
              />
              <Route 
                path='/assignMedication' 
                element={<AssignMedication />} 
              />
            </Routes>
          </Container>
        </MedicationContextProvider>
      </PatientContextProvider>
    </main>
  );
};

export default App;

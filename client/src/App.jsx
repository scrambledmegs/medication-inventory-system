import React from 'react';
import Home from './pages/Home';
import NavigationBar from './components/NavigationBar';
import PatientList from './pages/PatientList';
import Patient from './pages/Patient';
import AdmitPatient from './pages/AdmitPatient';
import PatientMedication from './pages/PatientMedication';
import MedicationList from './pages/MedicationList';
import AssignMedication from './pages/AssignMedication';
import UpdateQuantity from './pages/UpdateQuantity';
import MedicationForm from './pages/MedicationForm';
import { PatientContextProvider } from './context/PatientContext';
import { MedicationContextProvider } from './context/MedicationContext';
import './App.css';

// React Router
import { Route, Routes } from 'react-router-dom';

// Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function App() {

  return (
    <div className='App'>
    <PatientContextProvider >
      <MedicationContextProvider>
        <Container>
          <Row>
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
              element={<UpdateQuantity />} 
            />
            <Route 
              path='/assignMedication' 
              element={<AssignMedication />} 
            />
          </Routes>
        </Container>
      </MedicationContextProvider>
    </PatientContextProvider>
    </div>
  );
};

export default App;

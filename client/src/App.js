import React from 'react';
import Home from './pages/Home';
import PatientList from './pages/PatientList';
import './App.css';
import { Link, Route, Routes } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import bootstrap from 'bootstrap';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/patientlist' element={<PatientList />} />
      </Routes>
    </>
  );
}

export default App;

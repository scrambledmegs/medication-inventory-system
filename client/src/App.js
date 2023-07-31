import React from 'react';
import Home from './pages/Home';
import PatientList from './pages/PatientList';
import './App.css';
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
import { PatientsContextProvider } from './context/PatientsContext';

function App() {
  return (
    <PatientsContextProvider>
      <Container fluid>
        <Row xs={1}>
          <Col className='testing'>
            <Navbar 
              expand="lg" 
              className="bg-body-tertiary" 
              data-bs-theme="dark"
            >
              <Container>
              <Navbar.Brand>Pyxis</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link as={Link} to="/">Home</Nav.Link>
                    <Nav.Link as={Link} to='/patientlist'>Patient List</Nav.Link>
                    <NavDropdown title="More Options" id="basic-nav-dropdown">
                      <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                      <NavDropdown.Divider />
                      <NavDropdown.Item href="#action/3.4">
                        Separated link
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
              <Route path='/patientlist' element={<PatientList />} />
            </Routes>
      </Container>
    </PatientsContextProvider>
  );
};

export default App;

import React from 'react';
import './NavigationBar.css';

// React Router
import { Link } from 'react-router-dom';

// Bootstrap
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


const NavigationBar = () => {
  return (
    <nav>
      <Navbar 
        expand="lg" 
        className="bg-body-tertiary" 
      >
        <Container>
          <Navbar.Brand>PharmaLogix</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <NavDropdown title='Patients' id='basic-nav-dropdown'>
                  <NavDropdown.Item 
                    as={Link}
                    to='/admitPatient'
                  >
                    Admit Patient
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item 
                    as={Link} 
                    to='/patients'
                  >
                    Patient List
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown 
                  title="Medications" 
                  id="basic-nav-dropdown"
                >
                  <NavDropdown.Item
                    as={Link}
                    to='/medicationForm'
                  >
                    Add Medication
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
    </nav>
  );
};

export default NavigationBar;
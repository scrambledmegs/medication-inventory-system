import React, { useState } from 'react';
import './Home.css';

// React Router
import { Link } from 'react-router-dom';

// Bootstrap
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Home = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1>Medication Admin/Inventory System</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <div>
            <Link to='/patients'>
              <Button variant='primary'>Click to Begin</Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
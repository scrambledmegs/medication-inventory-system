import React from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

// Bootstrap
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

const Home = () => {
  return (
    <Container>
      <Row className='test '>
        <Col>
          <h1>Medication Admin/Inventory System</h1>
          <div className='click-begin'>
            <Link to='/patientlist'>
              <Button variant='primary'>Click to Begin</Button>
            </Link>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Home
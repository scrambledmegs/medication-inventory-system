import React from 'react';
import './Home.css';

// React Router
import { Link } from 'react-router-dom';

// Bootstrap
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const Home = () => {
  return (
    <main>
      <Container>
        <Row>
          <Col>
            <h1>Medication Admin/Inventory System</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <div className='click-begin'>
              <Link to='/patients'>
                <button className='home-btn'>Click to Begin</button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </main>
  );
};

export default Home;
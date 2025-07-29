import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--primary-color)',
      color: 'white',
      borderTopLeftRadius: '15px',
      borderTopRightRadius: '15px',
      boxShadow: '0 -5px 15px rgba(0, 0, 0, 0.05)'
    }} className="py-4 mt-5">
      <Container>
        <Row>
          <Col className="text-center">
            <p className="mb-0" style={{
              fontSize: '1.1rem',
              fontWeight: '500',
              letterSpacing: '0.5px'
            }}>
              <i className="fas fa-graduation-cap me-2"></i>
              Copyright &copy; {new Date().getFullYear()} Isha Thakur
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
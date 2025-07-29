import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col xs={12} md={6} style={{
          background: 'linear-gradient(135deg, #ffffff 0%, var(--secondary-color) 100%)',
          padding: '2rem',
          borderRadius: 'var(--border-radius)',
          boxShadow: 'var(--card-shadow)',
          border: '1px solid rgba(239, 124, 142, 0.2)',
          marginTop: '1.5rem',
          marginBottom: '2rem',
          /* Removed 3D transforms that were causing clickability issues */
          transition: 'var(--hover-transition)'
        }}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
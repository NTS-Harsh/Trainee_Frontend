import React, { useState } from 'react';
import { Row, Col, Card, Form, Button, Container } from 'react-bootstrap';
import AdminAvatar from '../components/AdminAvatar';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/slices/userSlice';
import { loginRequest } from '../redux/sagas/userSagas';
import Message from '../components/Message';
import Loader from '../components/Loader';

const HomeScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, userInfo } = useSelector((state) => state.user);

  const submitHandler = (e) => {
    e.preventDefault();
    // Dispatch both Redux Toolkit and Redux Saga actions
    dispatch(login({ email, password }));
    dispatch(loginRequest(email, password));
  };

  // If user is already logged in, redirect to dashboard
  if (userInfo) {
    // If user is admin, show admin dashboard
    if (userInfo.role === 'admin') {
      return (
        <Container className="py-5">
          <AdminAvatar />
          <div className="text-center">
            <h2 className="mb-4">Welcome back, Admin!</h2>
            <Button
              onClick={() => navigate('/admin/trainee-list')}
              style={{
                backgroundColor: '#ef7c8e',
                borderColor: '#e05c70',
                color: 'white',
                borderRadius: '25px',
                padding: '12px 25px',
                fontWeight: '600',
                boxShadow: '0 4px 6px rgba(239, 124, 142, 0.2)',
                margin: '10px'
              }}
            >
              <i className="fas fa-users me-2"></i> Manage Trainees
            </Button>
            <Button
              onClick={() => navigate('/view-profile')}
              style={{
                backgroundColor: '#ef7c8e',
                borderColor: '#e05c70',
                color: 'white',
                borderRadius: '25px',
                padding: '12px 25px',
                fontWeight: '600',
                boxShadow: '0 4px 6px rgba(239, 124, 142, 0.2)',
                margin: '10px'
              }}
            >
              <i className="fas fa-user me-2"></i> View Profile
            </Button>
          </div>
        </Container>
      );
    }
    // For regular users
    navigate('/view-profile');
    return null;
  }

  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} className="text-center mb-5">
          <h1 className="display-4 fw-bold display-3d" style={{
            color: 'var(--primary-color)',
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)'
          }}>
            <i className="fas fa-graduation-cap me-3"></i>
            Trainee Management System
          </h1>
          <p className="lead">
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow border-0 rounded-lg overflow-hidden" style={{
            boxShadow: '0 15px 35px rgba(239, 124, 142, 0.3), 0 5px 15px rgba(0,0,0,0.1)'
          }}>
            <Card.Header className="text-white text-center py-4" style={{
              background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)',
              position: 'relative'
            }}>
              <h3 className="mb-0" style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.2)' }}>Login</h3>
            </Card.Header>
            <Card.Body className="p-4" style={{
              background: 'linear-gradient(135deg, #ffffff 0%, var(--secondary-color) 100%)'
            }}>
              {error && <Message variant="danger">{error}</Message>}
              {loading && <Loader />}
              <Form onSubmit={submitHandler}>
                <Form.Group controlId="email" className="mb-3">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group controlId="password" className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="d-grid">
                  <Button
                    type="submit"
                    size="lg"
                    className="btn-login"
                    style={{
                      backgroundColor: '#ef7c8e',
                      borderColor: '#e05c70',
                      color: 'white',
                      borderRadius: '25px',
                      padding: '12px 20px',
                      transform: 'translateZ(5px)',
                      fontWeight: '600',
                      boxShadow: '0 4px 6px rgba(239, 124, 142, 0.2)',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <i className="fas fa-sign-in-alt me-2"></i>Sign In
                  </Button>
                </div>
              </Form>
            </Card.Body>
            <Card.Footer className="py-3 text-center" style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, var(--secondary-color) 100%)',
              transform: 'translateZ(5px)',
              borderTop: '1px solid rgba(239, 124, 142, 0.2)'
            }}>
              <p className="mb-0" style={{ fontSize: '1.1rem' }}>
                Don't have an account?{' '}
                <Link
                  to="/register"
                  className="fw-bold"
                  style={{
                    color: 'var(--primary-color)',
                    textDecoration: 'none',
                    position: 'relative',
                    padding: '5px 10px',
                    borderRadius: '5px',
                    transition: 'var(--hover-transition)',
                    textShadow: 'var(--text-shadow)'
                  }}
                >
                  Register here
                </Link>
              </p>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default HomeScreen;
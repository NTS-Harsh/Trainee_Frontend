import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { loginRequest } from '../redux/sagas/userSagas';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { loading, error, userInfo } = useSelector((state) => state.user);

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    // Dispatch saga action
    dispatch(loginRequest(email, password));
  };

  return (
    <FormContainer>
      <div className="text-center mb-4">
        <h1 className="fw-bold">
          <span style={{
            backgroundColor: '#ef7c8e',
            color: 'white',
            padding: '8px 20px',
            borderRadius: '25px',
            display: 'inline-block',
            boxShadow: '0 4px 6px rgba(239, 124, 142, 0.2)',
            marginBottom: '10px'
          }}>
            <i className="fas fa-sign-in-alt me-2"></i>Sign In
          </span>
        </h1>
        <p className="text-muted" style={{ textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.1)' }}>
          Enter your credentials to access your account
        </p>
      </div>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler} className="pb-3 mb-4">
        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="password" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <div className="d-grid gap-2 mt-4">
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

      <div className="text-center mt-4">
        <p className="mb-3" style={{ fontSize: '1.1rem' }}>
          New User?{' '}
          <Link
            to={redirect ? `/register?redirect=${redirect}` : '/register'}
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
            Register Here
          </Link>
        </p>
      </div>
    </FormContainer>
  );
};

export default LoginScreen;
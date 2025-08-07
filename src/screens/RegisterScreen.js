import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';
import { registerRequest } from '../redux/sagas/userSagas';

const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [gender, setGender] = useState('male');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

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
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(registerRequest({ name, email, password, department, gender }));
    }
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
            <i className="fas fa-user-plus me-2"></i>Sign Up
          </span>
        </h1>
        <p className="text-muted" style={{ textShadow: '0.5px 0.5px 1px rgba(0,0,0,0.1)' }}>
          Create an account to access the trainee management system
        </p>
      </div>
      {message && <Message variant="danger">{message}</Message>}
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler} className="pb-3 mb-4">
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="email" className="mb-3">
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="department" className="mb-3">
          <Form.Label>Department</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group controlId="gender" className="mb-3">
          <Form.Label>Gender</Form.Label>
          <div>
            <Form.Check
              type="radio"
              label="Male"
              name="gender"
              id="male"
              value="male"
              checked={gender === 'male'}
              onChange={(e) => setGender(e.target.value)}
              inline
              className="me-4"
            />
            <Form.Check
              type="radio"
              label="Female"
              name="gender"
              id="female"
              value="female"
              checked={gender === 'female'}
              onChange={(e) => setGender(e.target.value)}
              inline
            />
          </div>
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

        <Form.Group controlId="confirmPassword" className="mb-3">
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <div className="d-grid gap-2 mt-4">
          <Button
            type="submit"
            size="lg"
            className="btn-register"
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
            <i className="fas fa-user-plus me-2"></i>Register
          </Button>
        </div>
      </Form>

      <div className="text-center mt-4">
        <p className="mb-3" style={{ fontSize: '1.1rem' }}>
          Have an Account?{' '}
          <Link
            to={redirect ? `/login?redirect=${redirect}` : '/login'}
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
            Login Here
          </Link>
        </p>
      </div>
    </FormContainer>
  );
};

export default RegisterScreen;
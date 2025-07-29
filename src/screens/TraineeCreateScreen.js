import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { createTrainee } from '../redux/actions/traineeActions';
import { TRAINEE_CREATE_RESET } from '../redux/constants/traineeConstants';

const TraineeCreateScreen = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const traineeCreate = useSelector((state) => state.traineeCreate);
  const { loading, error, success } = traineeCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || userInfo.role !== 'admin') {
      navigate('/login');
      return;
    }

    if (success) {
      dispatch({ type: TRAINEE_CREATE_RESET });
      navigate('/admin/traineelist');
    }
  }, [dispatch, navigate, success, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(
        createTrainee({
          name,
          email,
          department,
          password,
        })
      );
    }
  };

  return (
    <>
      <div className="bg-white p-4 rounded shadow-sm border mb-4 mx-auto trainee-create-container" style={{
        maxWidth: '800px',
        borderRadius: '15px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s ease'
      }}>
        <div className="text-center mb-4">
          <h1 className="fw-bold trainee-create-title" style={{
            color: '#ef7c8e',
            position: 'relative',
            display: 'inline-block',
            paddingBottom: '10px'
          }}>
            <i className="fas fa-user-plus me-2"></i>Create Trainee
          </h1>
          <p className="text-muted">Add a new trainee to the system</p>
        </div>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler} className="pb-3">
          <Form.Group controlId="name" className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="email" className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="department" className="mb-3">
            <Form.Label>Department</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="password" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId="confirmPassword" className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            ></Form.Control>
          </Form.Group>

          <div className="d-grid gap-2 mt-4">
            <Button
              type="submit"
              size="lg"
              className="create-trainee-submit-btn"
              style={{
                backgroundColor: '#ef7c8e',
                borderColor: '#e05c70',
                color: 'white',
                borderRadius: '25px',
                padding: '12px 20px',
                fontWeight: '600',
                boxShadow: '0 4px 6px rgba(239, 124, 142, 0.2)',
                transition: 'all 0.3s ease'
              }}
            >
              <i className="fas fa-plus me-2"></i>
              Create
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

export default TraineeCreateScreen;
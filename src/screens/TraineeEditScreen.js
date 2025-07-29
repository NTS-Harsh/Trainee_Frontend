import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  getTraineeDetails,
  updateTrainee,
} from '../redux/actions/traineeActions';
import { TRAINEE_UPDATE_RESET } from '../redux/constants/traineeConstants';

const TraineeEditScreen = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const traineeDetails = useSelector((state) => state.traineeDetails);
  const { loading, error, trainee } = traineeDetails;

  const traineeUpdate = useSelector((state) => state.traineeUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = traineeUpdate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo || userInfo.role !== 'admin') {
      navigate('/login');
      return;
    }

    if (successUpdate) {
      dispatch({ type: TRAINEE_UPDATE_RESET });
      navigate('/admin/traineelist');
    } else {
      if (!trainee.name || trainee._id !== id) {
        dispatch(getTraineeDetails(id));
      } else {
        setName(trainee.name);
        setEmail(trainee.email);
        setDepartment(trainee.department);
      }
    }
  }, [dispatch, navigate, id, trainee, successUpdate, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateTrainee({
        _id: id,
        name,
        email,
        department,
        password: password ? password : undefined,
      })
    );
  };

  return (
    <>
      <div className="bg-white p-4 rounded shadow-sm border mb-4 mx-auto trainee-edit-container" style={{
        maxWidth: '800px',
        borderRadius: '15px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
        transition: 'all 0.3s ease'
      }}>
        <div className="text-center mb-4">
          <h1 className="fw-bold trainee-edit-title" style={{
            color: '#ef7c8e',
            position: 'relative',
            display: 'inline-block',
            paddingBottom: '10px'
          }}>
            <i className="fas fa-user-edit me-2"></i>Edit Trainee
          </h1>
          <p className="text-muted">Update trainee information below</p>
        </div>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler} className="pb-3">
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

            <Form.Group controlId="password" className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter new password (leave blank to keep current)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <div className="d-grid gap-2 mt-4">
              <Button
                type="submit"
                size="lg"
                className="update-trainee-btn"
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
                <i className="fas fa-save me-2"></i>
                Update
              </Button>
            </div>
          </Form>
        )}
      </div>
    </>
  );
};

export default TraineeEditScreen;
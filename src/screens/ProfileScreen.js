import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails, updateUserProfile } from '../redux/actions/userActions';
import { USER_UPDATE_PROFILE_RESET } from '../redux/constants/userConstants';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      if (!user || !user.name || success) {
        dispatch({ type: USER_UPDATE_PROFILE_RESET });
        dispatch(getUserDetails());
      } else {
        setName(user.name);
        setEmail(user.email);
        setDepartment(user.department);
      }
    }
  }, [dispatch, navigate, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      dispatch(
        updateUserProfile({
          id: user._id,
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
      <Row className="justify-content-center">
        <Col md={8} className="profile-form-container">
          <Card className="bg-white shadow-sm border mb-4 profile-form-card" style={{
            borderRadius: '15px',
            overflow: 'hidden',
            transition: 'all 0.3s ease'
          }}>
            <Card.Header className="text-white py-3" style={{ backgroundColor: '#ef7c8e' }}>
              <h2 className="mb-0 text-center">
                <i className="fas fa-user-edit me-2"></i>Update Your Profile
              </h2>
            </Card.Header>
            <Card.Body className="p-4">
              {message && <Message variant="danger">{message}</Message>}
              {error && <Message variant="danger">{error}</Message>}
              {success && <Message variant="success">Profile Updated Successfully!</Message>}
              {loading && <Loader />}
              
              <Form onSubmit={submitHandler}>
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
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter new password (leave blank to keep current)"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <Form.Group controlId="confirmPassword" className="mb-4">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  ></Form.Control>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button
                    type="submit"
                    size="lg"
                    className="save-profile-btn"
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
                    <i className="fas fa-save me-2"></i> Save Changes
                  </Button>
                </div>
                
                <div className="text-center mt-3">
                  <Link to="/view-profile" className="btn btn-link view-profile-link" style={{
                    color: '#ef7c8e',
                    fontWeight: '500',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                    padding: '8px 16px',
                    borderRadius: '20px'
                  }}>
                    <i className="fas fa-eye me-1"></i> View Your Profile
                  </Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen;
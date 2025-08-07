import React, { useState, useEffect } from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';
import AdminAvatar from '../components/AdminAvatar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { resetUpdateProfile } from '../redux/slices/userSlice';
import { getUserDetailsRequest, updateUserProfileRequest } from '../redux/sagas/userSagas';

const ProfileScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [department, setDepartment] = useState('');
  const [gender, setGender] = useState('male');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [isHiding, setIsHiding] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user, userInfo, success } = useSelector((state) => ({
    loading: state.user.loading,
    error: state.user.error,
    user: state.user.user,
    userInfo: state.user.userInfo,
    success: state.user.success
  }));

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      if (!user || !user.name || success) {
        dispatch(resetUpdateProfile());
        dispatch(getUserDetailsRequest());
      } else {
        setName(user.name);
        setEmail(user.email);
        setDepartment(user.department);
        setGender(user.gender || 'male');
      }
      
      // Set timeout to hide welcome message after 5 seconds
      const welcomeTimer = setTimeout(() => {
        setIsHiding(true);
        // Wait for animation to complete before removing from DOM
        setTimeout(() => {
          setShowWelcome(false);
        }, 1200); // Match the animation duration
      }, 3800); // Start hiding after 3.8 seconds to complete the 5 second requirement
      
      // Clean up timer on component unmount
      return () => clearTimeout(welcomeTimer);
    }
  }, [dispatch, navigate, userInfo, user, success]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Passwords do not match');
    } else {
      // Dispatch only one action to avoid potential infinite loops
      const userData = {
        id: user._id,
        name,
        email,
        department,
        gender,
        password,
      };
      dispatch(updateUserProfileRequest(userData));
    }
  };

  return (
    <>
      {userInfo && userInfo.role === 'admin' && <AdminAvatar />}
      
      {/* Welcome Message */}
      {userInfo && showWelcome && (
        <div className={`welcome-message mb-4 text-center ${isHiding ? 'hiding' : ''}`} style={{
          animation: 'fadeIn 0.5s ease-in-out',
          transition: 'opacity 0.5s ease-in-out'
        }}>
          <div style={{
            backgroundColor: 'rgba(239, 124, 142, 0.1)',
            borderRadius: '15px',
            padding: '15px',
            boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
            border: '1px solid rgba(239, 124, 142, 0.2)',
            maxWidth: '800px',
            margin: '0 auto',
            transform: 'translateZ(5px)',
            position: 'relative'
          }}>
            <h2 style={{
              color: '#ef7c8e',
              fontWeight: 'bold',
              marginBottom: '0'
            }}>
              <i className="fas fa-hand-sparkles me-2"></i>
              Welcome, {userInfo.name}!
            </h2>
            <p className="text-muted mb-0 mt-2">
              {new Date().getHours() < 12
                ? "Good morning! Update your profile information below."
                : new Date().getHours() < 17
                  ? "Good afternoon! Feel free to update your details."
                  : "Good evening! Take a moment to review your profile."}
            </p>
          </div>
        </div>
      )}
      
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
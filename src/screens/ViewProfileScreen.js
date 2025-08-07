import React, { useEffect, useState } from 'react';
import { Row, Col, Card, ListGroup } from 'react-bootstrap';
import AdminAvatar from '../components/AdminAvatar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetailsRequest } from '../redux/sagas/userSagas';
import { getAvatarUrl } from '../utils/avatarUtils';

const ViewProfileScreen = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [isHiding, setIsHiding] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, user, userInfo } = useSelector((state) => ({
    loading: state.user.loading,
    error: state.user.error,
    user: state.user.user,
    userInfo: state.user.userInfo
  }));

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      // Dispatch only one action to avoid potential infinite loops
      dispatch(getUserDetailsRequest());
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
  }, [dispatch, navigate, userInfo]);

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
                ? "Good morning! Have a productive day ahead."
                : new Date().getHours() < 17
                  ? "Good afternoon! Hope you're having a great day."
                  : "Good evening! Hope you had a wonderful day."}
            </p>
          </div>
        </div>
      )}
      
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="bg-white shadow-sm border mb-4 profile-card" style={{
            borderRadius: '15px',
            overflow: 'hidden',
            transition: 'all 0.3s ease',
            transformStyle: 'preserve-3d',
            boxShadow: 'var(--card-shadow)'
          }}>
            <Card.Header className="text-white py-3" style={{
              background: 'linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%)',
              position: 'relative'
            }}>
              <h2 className="mb-0 text-center" style={{ textShadow: 'var(--text-shadow)' }}>
                <i className="fas fa-user me-2"></i>Your Profile
              </h2>
            </Card.Header>
            <Card.Body>
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant="danger">{error}</Message>
              ) : (
                <>
                  <div className="text-center mb-4">
                    <div className="rounded-circle mx-auto mb-3 overflow-hidden profile-avatar" style={{
                      width: '120px',
                      height: '120px',
                      boxShadow: '0 10px 20px rgba(239, 124, 142, 0.2)',
                      border: '3px solid rgba(239, 124, 142, 0.3)',
                      transition: 'var(--hover-transition)'
                    }}>
                      <img
                        src={getAvatarUrl(user)}
                        alt={user.name}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.transform = 'scale(1.1)';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.transform = 'scale(1)';
                        }}
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = 'https://api.dicebear.com/7.x/identicon/svg?seed=fallback';
                        }}
                      />
                    </div>
                    <h3 className="fw-bold">{user.name}</h3>
                    <p className="text-muted">{user.role}</p>
                  </div>

                  <ListGroup variant="flush" className="border rounded mb-4" style={{
                    borderColor: 'rgba(239, 124, 142, 0.3)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
                    transformStyle: 'preserve-3d'
                  }}>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center py-3">
                      <div>
                        <i className="fas fa-envelope me-2" style={{ color: '#ef7c8e' }}></i>
                        <strong>Email</strong>
                      </div>
                      <span>{user.email}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center py-3">
                      <div>
                        <i className="fas fa-building me-2" style={{ color: '#ef7c8e' }}></i>
                        <strong>Department</strong>
                      </div>
                      <span>{user.department}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center py-3">
                      <div>
                        <i className="fas fa-user-tag me-2" style={{ color: '#ef7c8e' }}></i>
                        <strong>Role</strong>
                      </div>
                      <span className="badge" style={{ backgroundColor: '#ef7c8e' }}>{user.role}</span>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-flex justify-content-between align-items-center py-3">
                      <div>
                        <i className="fas fa-calendar-alt me-2" style={{ color: '#ef7c8e' }}></i>
                        <strong>Joined</strong>
                      </div>
                      <span>{user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</span>
                    </ListGroup.Item>
                  </ListGroup>

                  <div className="d-grid gap-2">
                    <Link to="/profile" className="btn edit-profile-btn" style={{
                      backgroundColor: '#ef7c8e',
                      borderColor: '#e05c70',
                      color: 'white',
                      borderRadius: '25px',
                      padding: '12px 20px',
                      fontWeight: '600',
                      boxShadow: '0 8px 15px rgba(239, 124, 142, 0.3)',
                      transition: 'var(--hover-transition)'
                    }}>
                      <i className="fas fa-user-edit me-2"></i>Edit Profile
                    </Link>
                  </div>
                </>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ViewProfileScreen; 
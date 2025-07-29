import React, { useEffect } from 'react';
import { Row, Col, Card, ListGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getUserDetails } from '../redux/actions/userActions';

const ViewProfileScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      dispatch(getUserDetails());
    }
  }, [dispatch, navigate, userInfo]);

  return (
    <>
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
                    <div className="rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center profile-avatar" style={{
                      width: '120px',
                      height: '120px',
                      backgroundColor: 'rgba(239, 124, 142, 0.1)',
                      boxShadow: '0 10px 20px rgba(239, 124, 142, 0.2)',
                      border: '3px solid rgba(239, 124, 142, 0.3)',
                      transition: 'var(--hover-transition)'
                    }}>
                      <i className="fas fa-user fa-3x" style={{ color: '#ef7c8e' }}></i>
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
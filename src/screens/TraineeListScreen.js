import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Button, Row, Col, Card, Badge, Form, InputGroup } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Message from '../components/Message';
import Loader from '../components/Loader';
import {
  listTrainees,
  deleteTrainee,
} from '../redux/actions/traineeActions';
import { TRAINEE_CREATE_RESET } from '../redux/constants/traineeConstants';

const TraineeListScreen = () => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filteredTrainees, setFilteredTrainees] = React.useState([]);
  // Function to get a consistent avatar for each trainee based on their ID
  const getAvatarUrl = (id) => {
    // Use the last character of the ID to determine the avatar number (1-8)
    const lastChar = id.charAt(id.length - 1);
    const avatarNumber = parseInt(lastChar, 16) % 8 + 1; // Convert hex to decimal, mod 8, then add 1 (1-8)
    const gender = parseInt(lastChar, 16) % 2 === 0 ? 'men' : 'women'; // Even numbers are men, odd are women
    return `https://randomuser.me/api/portraits/${gender}/${avatarNumber}.jpg`;
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const traineeList = useSelector((state) => state.traineeList);
  const { loading, error, trainees } = traineeList;

  const traineeDelete = useSelector((state) => state.traineeDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = traineeDelete;

  const traineeCreate = useSelector((state) => state.traineeCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    trainee: createdTrainee,
  } = traineeCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    dispatch({ type: TRAINEE_CREATE_RESET });

    if (!userInfo || userInfo.role !== 'admin') {
      navigate('/login');
    }

    if (successCreate) {
      navigate(`/admin/trainee/${createdTrainee._id}/edit`);
    } else {
      dispatch(listTrainees());
    }
  }, [
    dispatch,
    navigate,
    userInfo,
    successDelete,
    successCreate,
    createdTrainee,
  ]);

  // Filter trainees based on search term
  useEffect(() => {
    if (trainees) {
      setFilteredTrainees(
        trainees.filter(
          (trainee) =>
            trainee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            trainee.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
            trainee.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }
  }, [trainees, searchTerm]);

  const deleteHandler = (id) => {
    if (window.confirm('Are you sure you want to delete this trainee?')) {
      dispatch(deleteTrainee(id));
    }
  };

  const createTraineeHandler = () => {
    navigate('/admin/trainee/create');
  };

  return (
    <>
      <div className="bg-white p-4 rounded shadow-sm border mb-4 trainee-list-container" style={{
        borderRadius: '15px',
        transition: 'all 0.3s ease',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)'
      }}>
        <Row className="align-items-center mb-4">
          <Col md={4}>
            <h1 className="fw-bold mb-0 d-flex align-items-center">
              <i className="fas fa-users me-3"></i>
              Trainees
            </h1>
          </Col>
          <Col md={4}>
            <InputGroup>
              <InputGroup.Text style={{
                backgroundColor: 'rgba(239, 124, 142, 0.1)',
                borderColor: 'rgba(239, 124, 142, 0.2)',
                color: '#ef7c8e'
              }}>
                <i className="fas fa-search"></i>
              </InputGroup.Text>
              <Form.Control
                type="text"
                placeholder="Search by name, email or department..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  borderColor: 'rgba(239, 124, 142, 0.2)',
                  boxShadow: 'none'
                }}
              />
              {searchTerm && (
                <Button
                  variant="outline-secondary"
                  onClick={() => setSearchTerm('')}
                  style={{ borderColor: 'rgba(239, 124, 142, 0.2)' }}
                >
                  <i className="fas fa-times"></i>
                </Button>
              )}
            </InputGroup>
          </Col>
          <Col md={4} className="text-end">
            <Button
              className="my-2 create-trainee-btn"
              onClick={createTraineeHandler}
              style={{
                backgroundColor: '#ef7c8e',
                borderColor: '#e05c70',
                color: 'white',
                borderRadius: '25px',
                padding: '10px 20px',
                fontWeight: '600',
                boxShadow: '0 4px 6px rgba(239, 124, 142, 0.2)',
                transition: 'all 0.3s ease'
              }}
            >
              <i className="fas fa-plus me-2"></i> Create Trainee
            </Button>
          </Col>
        </Row>
        {loadingDelete && <Loader />}
        {errorDelete && <Message variant="danger">{errorDelete}</Message>}
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant="danger">{errorCreate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : !trainees || trainees.length === 0 ? (
            <div className="text-center py-5">
              <div style={{
                fontSize: '4rem',
                color: 'rgba(239, 124, 142, 0.3)',
                marginBottom: '1rem'
              }}>
                <i className="fas fa-users-slash"></i>
              </div>
              <h3 className="text-muted">No trainees found</h3>
              <p className="mb-4">Click the "Create Trainee" button to add a new trainee</p>
              <Button
                onClick={createTraineeHandler}
                style={{
                  backgroundColor: '#ef7c8e',
                  borderColor: '#e05c70',
                  color: 'white',
                  borderRadius: '25px',
                  padding: '10px 25px',
                  fontWeight: '600',
                  boxShadow: '0 4px 6px rgba(239, 124, 142, 0.2)',
                }}
              >
                <i className="fas fa-plus me-2"></i> Create Trainee
              </Button>
            </div>
        ) : filteredTrainees.length === 0 ? (
          <div className="text-center py-5">
            <div style={{
              fontSize: '4rem',
              color: 'rgba(239, 124, 142, 0.3)',
              marginBottom: '1rem'
            }}>
              <i className="fas fa-search"></i>
            </div>
            <h3 className="text-muted">No matching trainees found</h3>
            <p className="mb-4">Try adjusting your search criteria</p>
            <Button
              onClick={() => setSearchTerm('')}
              style={{
                backgroundColor: '#ef7c8e',
                borderColor: '#e05c70',
                color: 'white',
                borderRadius: '25px',
                padding: '10px 25px',
                fontWeight: '600',
                boxShadow: '0 4px 6px rgba(239, 124, 142, 0.2)',
              }}
            >
              <i className="fas fa-times me-2"></i> Clear Search
            </Button>
          </div>
        ) : (
          <Row>
              {filteredTrainees.map((trainee) => (
                <Col key={trainee._id} xs={12} md={6} lg={4} className="mb-4 trainee-card-col">
                  <Card className="h-100 trainee-card" style={{
                    borderRadius: '15px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
                    border: '1px solid rgba(239, 124, 142, 0.2)',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-10px)';
                    e.currentTarget.style.boxShadow = '0 15px 30px rgba(239, 124, 142, 0.3)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
                  }}>
                    <div className="text-center pt-4 pb-2">
                      <div className="rounded-circle mx-auto mb-3 overflow-hidden" style={{
                        width: '100px',
                        height: '100px',
                        boxShadow: '0 5px 15px rgba(239, 124, 142, 0.2)',
                        border: '3px solid rgba(239, 124, 142, 0.3)',
                        transition: 'all 0.3s ease'
                      }}>
                        <img
                          src={getAvatarUrl(trainee._id)}
                          alt={trainee.name}
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
                            e.target.src = 'https://via.placeholder.com/100x100?text=User';
                          }}
                        />
                      </div>
                      <h3 className="fw-bold mb-0">{trainee.name}</h3>
                      <Badge bg="light" text="dark" className="mt-2 mb-3" style={{
                        backgroundColor: 'rgba(239, 124, 142, 0.1)',
                        color: '#ef7c8e',
                        padding: '8px 15px',
                        borderRadius: '20px',
                        fontSize: '0.9rem'
                      }}>
                        {trainee.department}
                      </Badge>
                    </div>
                    
                    <Card.Body className="pt-0">
                      <div className="mb-3">
                        <p className="mb-1 text-muted"><i className="fas fa-envelope me-2" style={{ color: '#ef7c8e' }}></i>Email:</p>
                        <p className="mb-0 ps-4">
                          <a href={`mailto:${trainee.email}`} style={{
                            color: '#333',
                            textDecoration: 'none',
                            fontWeight: '500'
                          }}>
                            {trainee.email}
                          </a>
                        </p>
                      </div>
                      
                      <div className="mb-3">
                        <p className="mb-1 text-muted"><i className="fas fa-id-badge me-2" style={{ color: '#ef7c8e' }}></i>ID:</p>
                        <p className="mb-0 ps-4 text-truncate" style={{ fontSize: '0.9rem' }}>{trainee._id}</p>
                      </div>
                    </Card.Body>
                    
                    <Card.Footer className="bg-white border-top d-flex justify-content-between py-3" style={{
                      borderTop: '1px solid rgba(239, 124, 142, 0.2)'
                    }}>
                      <div className="d-flex w-100">
                        <LinkContainer to={`/admin/trainee/${trainee._id}/edit`} className="w-50 me-2">
                          <Button
                            className="edit-trainee-btn w-100"
                            style={{
                              backgroundColor: '#ef7c8e',
                              borderColor: '#e05c70',
                              color: 'white',
                              borderRadius: '20px',
                              padding: '8px 0',
                              boxShadow: '0 4px 6px rgba(239, 124, 142, 0.2)',
                              transition: 'all 0.3s ease'
                            }}
                          >
                            <i className="fas fa-edit me-2"></i>Edit
                          </Button>
                        </LinkContainer>
                        <Button
                          variant="outline-danger"
                          className="delete-trainee-btn w-50"
                          onClick={() => deleteHandler(trainee._id)}
                          style={{
                            borderRadius: '20px',
                            padding: '8px 0',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          <i className="fas fa-trash me-2"></i>Delete
                        </Button>
                      </div>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
        )}
      </div>
    </>
  );
};

export default TraineeListScreen;
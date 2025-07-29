import React, { useEffect } from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
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
          <Col>
            <h1 className="fw-bold mb-0 d-flex align-items-center">
              <i className="fas fa-users me-3"></i>
              Trainees
            </h1>
          </Col>
          <Col className="text-end">
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
        ) : (
          <div className="table-responsive">
            <Table
              striped
              bordered
              hover
              responsive
              className="mb-0 trainee-table"
              style={{
                borderRadius: '10px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
              }}
            >
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>DEPARTMENT</th>
                  <th className="text-center">ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {trainees.map((trainee) => (
                  <tr key={trainee._id}>
                    <td>{trainee._id}</td>
                    <td>{trainee.name}</td>
                    <td>
                      <a href={`mailto:${trainee.email}`}>{trainee.email}</a>
                    </td>
                    <td>{trainee.department}</td>
                    <td className="text-center">
                      <LinkContainer to={`/admin/trainee/${trainee._id}/edit`}>
                        <Button
                          className="btn-sm me-2 edit-trainee-btn"
                          style={{
                            backgroundColor: '#ef7c8e',
                            borderColor: '#e05c70',
                            color: 'white',
                            borderRadius: '20px',
                            padding: '5px 10px',
                            boxShadow: '0 2px 4px rgba(239, 124, 142, 0.2)',
                            transition: 'all 0.3s ease'
                          }}
                        >
                          <i className="fas fa-edit"></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant="danger"
                        className="btn-sm delete-trainee-btn"
                        onClick={() => deleteHandler(trainee._id)}
                        style={{
                          borderRadius: '20px',
                          padding: '5px 10px',
                          boxShadow: '0 2px 4px rgba(220, 53, 69, 0.2)',
                          transition: 'all 0.3s ease'
                        }}
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </>
  );
};

export default TraineeListScreen;
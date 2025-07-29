import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Sidebar from './Sidebar';
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ViewProfileScreen from '../screens/ViewProfileScreen';
import TraineeListScreen from '../screens/TraineeListScreen';
import TraineeCreateScreen from '../screens/TraineeCreateScreen';
import TraineeEditScreen from '../screens/TraineeEditScreen';

const MainLayout = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <>
      {userInfo ? (
        <Row>
          <Col md={3} lg={2} className="d-none d-md-block">
            <Sidebar />
          </Col>
          <Col md={9} lg={10}>
            <Routes>
              <Route path="/" element={<Navigate to="/view-profile" />} />
              <Route path="/profile" element={<ProfileScreen />} />
              <Route path="/view-profile" element={<ViewProfileScreen />} />
              <Route path="/admin/traineelist" element={<TraineeListScreen />} />
              <Route path="/admin/trainee/create" element={<TraineeCreateScreen />} />
              <Route path="/admin/trainee/:id/edit" element={<TraineeEditScreen />} />
              <Route path="*" element={<Navigate to="/view-profile" />} />
            </Routes>
          </Col>
        </Row>
      ) : (
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </>
  );
};

export default MainLayout;
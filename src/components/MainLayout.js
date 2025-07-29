import React, { useState, useEffect } from 'react';
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  // Check localStorage for sidebar state
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState) {
      setSidebarCollapsed(savedState === 'true');
    }
  }, []);

  // Listen for changes to localStorage
  useEffect(() => {
    const handleStorageChange = () => {
      const savedState = localStorage.getItem('sidebarCollapsed');
      if (savedState) {
        setSidebarCollapsed(savedState === 'true');
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for same-tab updates
    window.addEventListener('sidebarStateChanged', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('sidebarStateChanged', handleStorageChange);
    };
  }, []);

  return (
    <>
      {userInfo ? (
        <Row>
          <Col
            md={sidebarCollapsed ? 1 : 3}
            lg={sidebarCollapsed ? 1 : 2}
            className="d-none d-md-block p-0"
            style={{ transition: 'all 0.3s ease' }}
          >
            <Sidebar />
          </Col>
          <Col
            md={sidebarCollapsed ? 11 : 9}
            lg={sidebarCollapsed ? 11 : 10}
            style={{ transition: 'all 0.3s ease' }}
          >
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
import React from 'react';
import { Nav } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <>
      {userInfo && (
        <div className="sidebar p-3 border-end" style={{
          minHeight: '100%',
          backgroundColor: 'var(--secondary-color)'
        }}>
          <h4 style={{ color: '#ef7c8e' }} className="mb-4 border-bottom pb-2 fw-bold">
            <i className="fas fa-user-circle me-2"></i>
            User Menu
          </h4>
          <Nav className="flex-column" style={{ '--nav-link-color': '#ef7c8e' }}>
            <LinkContainer to="/view-profile">
              <Nav.Link className="mb-2" style={{ color: '#c62f45', fontWeight: '500' }}>
                <i className="fas fa-eye me-2"></i> View Your Profile
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/profile">
              <Nav.Link className="mb-2" style={{ color: '#c62f45', fontWeight: '500' }}>
                <i className="fas fa-user-edit me-2"></i> Update Your Profile
              </Nav.Link>
            </LinkContainer>
            {userInfo && userInfo.role === 'admin' && (
              <>
                <h5 className="mt-4 mb-3 border-bottom pb-2" style={{ color: '#ef7c8e' }}>
                  <i className="fas fa-user-shield me-2"></i>
                  Admin Menu
                </h5>
                <LinkContainer to="/admin/traineelist">
                  <Nav.Link className="mb-2" style={{ color: '#c62f45', fontWeight: '500' }}>
                    <i className="fas fa-users me-2"></i> Manage Trainees
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/admin/trainee/create">
                  <Nav.Link className="mb-2" style={{ color: '#c62f45', fontWeight: '500' }}>
                    <i className="fas fa-user-plus me-2"></i> Add New Trainee
                  </Nav.Link>
                </LinkContainer>
              </>
            )}
          </Nav>
        </div>
      )}
    </>
  );
};

export default Sidebar;
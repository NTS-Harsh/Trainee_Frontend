import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { logoutRequest } from '../redux/sagas/userSagas';

const Header = () => {
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.user);

  const logoutHandler = () => {
    // Dispatch saga action
    dispatch(logoutRequest());
  };

  return (
    <header>
      <Navbar
        style={{
          backgroundColor: 'var(--primary-color)',
          boxShadow: 'var(--card-shadow)',
          color: 'white'
        }}
        variant="dark"
        expand="lg"
        className="py-2"
        collapseOnSelect
      >
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand className="ms-3 fw-bold" style={{
              transition: 'all 0.3s ease',
              position: 'relative',
              padding: '5px 10px',
              borderRadius: '8px'
            }}>
              <i className="fas fa-graduation-cap me-2"></i>
              Trainee Management System
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto me-3">
              {userInfo ? (
                <>
                  <LinkContainer to="/view-profile">
                    <Nav.Link className="me-3" style={{
                      borderRadius: '20px',
                      padding: '8px 15px',
                      transition: 'all 0.3s ease'
                    }}>
                      <i className="fas fa-user me-1"></i> My Profile
                    </Nav.Link>
                  </LinkContainer>
                  <Nav.Link onClick={logoutHandler} style={{
                    borderRadius: '20px',
                    padding: '8px 15px',
                    transition: 'all 0.3s ease'
                  }}>
                    <i className="fas fa-sign-out-alt me-1"></i> Logout
                  </Nav.Link>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <Nav.Link className="me-3" style={{
                      borderRadius: '20px',
                      padding: '8px 15px',
                      transition: 'all 0.3s ease'
                    }}>
                      <i className="fas fa-sign-in-alt me-1"></i> Sign In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/register">
                    <Nav.Link style={{
                      borderRadius: '20px',
                      padding: '8px 15px',
                      transition: 'all 0.3s ease'
                    }}>
                      <i className="fas fa-user-plus me-1"></i> Register
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
              {userInfo && userInfo.role === 'admin' && (
                <NavDropdown
                  title={<span><i className="fas fa-user-shield me-1"></i> Admin</span>}
                  id="adminmenu"
                >
                  <LinkContainer to="/admin/traineelist">
                    <NavDropdown.Item>Trainees</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
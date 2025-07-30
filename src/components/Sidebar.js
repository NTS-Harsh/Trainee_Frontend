import React, { useState, useEffect } from 'react';
import { Nav, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector } from 'react-redux';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  
  // Check if there's a saved preference in localStorage
  useEffect(() => {
    const savedState = localStorage.getItem('sidebarCollapsed');
    if (savedState) {
      setCollapsed(savedState === 'true');
    }
  }, []);

  // Save preference to localStorage when changed
  const toggleSidebar = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    localStorage.setItem('sidebarCollapsed', newState.toString());
    
    // Dispatch custom event for same-tab communication
    window.dispatchEvent(new Event('sidebarStateChanged'));
  };
  const { userInfo } = useSelector((state) => state.user);

  return (
    <>
      {userInfo && (
        <div
          className={`sidebar ${collapsed ? 'collapsed' : ''} border-end`}
          style={{
            minHeight: '100%',
            backgroundColor: 'var(--secondary-color)',
            width: collapsed ? '60px' : '100%',
            transition: 'all 0.3s ease',
            overflow: 'hidden',
            padding: collapsed ? '1rem 0' : '1rem',
            position: 'relative'
          }}
        >
          <Button
            variant="link"
            className="toggle-btn p-0 border-0"
            onClick={toggleSidebar}
            style={{
              position: 'absolute',
              top: '10px',
              right: collapsed ? '10px' : '10px',
              color: '#ef7c8e',
              zIndex: 10,
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: collapsed ? 'rgba(255, 255, 255, 0.9)' : 'transparent',
              borderRadius: '50%',
              boxShadow: collapsed ? '0 2px 5px rgba(0, 0, 0, 0.1)' : 'none',
              justifyContent: 'center'
            }}
          >
            <i className={`fas fa-${collapsed ? 'chevron-right' : 'chevron-left'} fa-lg`}></i>
          </Button>
          <h4
            style={{
              color: '#ef7c8e',
              textAlign: collapsed ? 'center' : 'left',
              marginBottom: collapsed ? '1.5rem' : '1rem',
              borderBottom: collapsed ? 'none' : '1px solid #dee2e6',
              paddingBottom: collapsed ? '0' : '0.5rem',
              fontSize: collapsed ? '1.2rem' : '1.5rem'
            }}
            className="fw-bold"
          >
            <i className="fas fa-user-circle"></i>
            {!collapsed && <span className="ms-2">User Menu</span>}
          </h4>
          <Nav className="flex-column" style={{ '--nav-link-color': '#ef7c8e', alignItems: collapsed ? 'center' : 'flex-start' }}>
            <LinkContainer to="/view-profile">
              <Nav.Link
                className="mb-2"
                style={{
                  color: '#000000',
                  fontWeight: '500',
                  textAlign: collapsed ? 'center' : 'left',
                  padding: collapsed ? '0.5rem' : '0.5rem 1rem',
                  width: collapsed ? '40px' : 'auto',
                  height: collapsed ? '40px' : 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: collapsed ? 'center' : 'flex-start'
                }}
                title="View Your Profile"
              >
                <i className="fas fa-eye"></i>
                {!collapsed && <span className="ms-2">View Your Profile</span>}
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/profile">
              <Nav.Link
                className="mb-2"
                style={{
                  color: '#000000',
                  fontWeight: '500',
                  textAlign: collapsed ? 'center' : 'left',
                  padding: collapsed ? '0.5rem' : '0.5rem 1rem',
                  width: collapsed ? '40px' : 'auto',
                  height: collapsed ? '40px' : 'auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: collapsed ? 'center' : 'flex-start'
                }}
                title="Update Your Profile"
              >
                <i className="fas fa-user-edit"></i>
                {!collapsed && <span className="ms-2">Update Your Profile</span>}
              </Nav.Link>
            </LinkContainer>
            {userInfo && userInfo.role === 'admin' && (
              <>
                <h5
                  className="mt-4 mb-3"
                  style={{
                    color: '#ef7c8e',
                    textAlign: collapsed ? 'center' : 'left',
                    borderBottom: collapsed ? 'none' : '1px solid #dee2e6',
                    paddingBottom: collapsed ? '0' : '0.5rem',
                    fontSize: collapsed ? '1rem' : '1.25rem'
                  }}
                >
                  <i className="fas fa-user-shield"></i>
                  {!collapsed && <span className="ms-2">Admin Menu</span>}
                </h5>
                <LinkContainer to="/admin/traineelist">
                  <Nav.Link
                    className="mb-2"
                    style={{
                      color: '#000000',
                      fontWeight: '500',
                      textAlign: collapsed ? 'center' : 'left',
                      padding: collapsed ? '0.5rem' : '0.5rem 1rem',
                      width: collapsed ? '40px' : 'auto',
                      height: collapsed ? '40px' : 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: collapsed ? 'center' : 'flex-start'
                    }}
                    title="Manage Trainees"
                  >
                    <i className="fas fa-users"></i>
                    {!collapsed && <span className="ms-2">Manage Trainees</span>}
                  </Nav.Link>
                </LinkContainer>
                <LinkContainer to="/admin/trainee/create">
                  <Nav.Link
                    className="mb-2"
                    style={{
                      color: '#000000',
                      fontWeight: '500',
                      textAlign: collapsed ? 'center' : 'left',
                      padding: collapsed ? '0.5rem' : '0.5rem 1rem',
                      width: collapsed ? '40px' : 'auto',
                      height: collapsed ? '40px' : 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: collapsed ? 'center' : 'flex-start'
                    }}
                    title="Add New Trainee"
                  >
                    <i className="fas fa-user-plus"></i>
                    {!collapsed && <span className="ms-2">Add New Trainee</span>}
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
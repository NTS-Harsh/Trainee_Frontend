import React from 'react';
import { Badge } from 'react-bootstrap';

const AdminAvatar = () => {
  return (
    <div
      className="admin-avatar-container mb-4 d-flex align-items-center"
      style={{
        position: 'relative',
        background: 'linear-gradient(135deg, #ffffff 0%, var(--secondary-color) 100%)',
        borderRadius: '15px',
        padding: '15px',
        boxShadow: '0 5px 15px rgba(0, 0, 0, 0.05)',
        border: '1px solid rgba(239, 124, 142, 0.2)',
        transition: 'all 0.3s ease',
        cursor: 'pointer'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-5px)';
        e.currentTarget.style.boxShadow = '0 10px 25px rgba(239, 124, 142, 0.2)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
      }}
    >
      <div className="rounded-circle overflow-hidden me-3" style={{
        width: '60px',
        height: '60px',
        boxShadow: '0 5px 15px rgba(239, 124, 142, 0.2)',
        border: '3px solid rgba(239, 124, 142, 0.3)',
      }}>
        <img
          src="https://randomuser.me/api/portraits/men/1.jpg"
          alt="Admin"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>
      <div>
        <h4 className="mb-0 fw-bold" style={{ color: '#ef7c8e' }}>Admin Dashboard</h4>
        <p className="mb-0 text-muted">Manage your trainees</p>
      </div>
      <div className="ms-auto">
        <Badge bg="light" text="dark" className="p-2" style={{
          backgroundColor: 'rgba(239, 124, 142, 0.1)',
          color: '#ef7c8e',
          borderRadius: '20px',
          fontSize: '0.9rem',
          fontWeight: 'bold'
        }}>
          <i className="fas fa-crown me-1"></i> Admin
        </Badge>
      </div>
    </div>
  );
};

export default AdminAvatar;
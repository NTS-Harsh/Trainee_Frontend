import React from 'react';
import { Alert } from 'react-bootstrap';

const Message = ({ variant, children }) => {
  return (
    <Alert
      variant={variant}
      style={{
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        border: variant === 'info' ? '1px solid var(--info-color)' :
               variant === 'danger' ? '1px solid var(--danger-color)' :
               variant === 'success' ? '1px solid var(--success-color)' :
               variant === 'warning' ? '1px solid var(--warning-color)' : '1px solid var(--border-color)'
      }}
    >
      {children}
    </Alert>
  );
};

Message.defaultProps = {
  variant: 'info',
};

export default Message;
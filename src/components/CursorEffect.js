import React, { useEffect, useState } from 'react';

const CursorEffect = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [followerPosition, setFollowerPosition] = useState({ x: 0, y: 0 });
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [hoverType, setHoverType] = useState('');

  useEffect(() => {
    // Add clickable class and hover events to interactive elements
    const setupInteractiveElements = () => {
      const elements = document.querySelectorAll('a, button, .btn, .nav-link, .card, .form-control, .toggle-btn');
      elements.forEach(element => {
        element.classList.add('clickable');
        
        // Add hover events
        element.addEventListener('mouseenter', () => {
          setIsHovering(true);
          
          // Set hover type based on element
          if (element.classList.contains('toggle-btn')) {
            setHoverType('toggle');
          } else if (element.tagName === 'BUTTON' || element.classList.contains('btn')) {
            setHoverType('button');
          } else if (element.tagName === 'A' || element.classList.contains('nav-link')) {
            setHoverType('link');
          } else if (element.classList.contains('card')) {
            setHoverType('card');
          } else if (element.classList.contains('form-control')) {
            setHoverType('input');
          } else {
            setHoverType('default');
          }
        });
        
        element.addEventListener('mouseleave', () => {
          setIsHovering(false);
          setHoverType('');
        });
      });
    };

    // Handle mouse movement
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      // Follower position with slight delay
      setTimeout(() => {
        setFollowerPosition({ x: e.clientX, y: e.clientY });
      }, 100);
    };

    // Handle mouse down
    const onMouseDown = () => {
      setIsClicking(true);
    };

    // Handle mouse up
    const onMouseUp = () => {
      setIsClicking(false);
    };

    // Add event listeners
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    
    // Initial setup
    setupInteractiveElements();
    
    // Hide default cursor
    document.body.style.cursor = 'none';

    // Cleanup
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.body.style.cursor = 'default';
    };
  }, []);

  return (
    <>
      <div
        className={`custom-cursor ${isHovering ? `hover-${hoverType}` : ''}`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: isClicking
            ? 'translate(-50%, -50%) scale(0.8)'
            : hoverType === 'toggle'
              ? 'translate(-50%, -50%) rotate(90deg)'
              : 'translate(-50%, -50%)',
          backgroundColor: isClicking
            ? 'rgba(239, 124, 142, 0.9)'
            : isHovering
              ? 'rgba(239, 124, 142, 0.8)'
              : 'rgba(239, 124, 142, 0.5)',
          borderRadius: hoverType === 'button'
            ? '5px'
            : hoverType === 'card'
              ? '10px'
              : '50%',
          width: hoverType === 'link'
            ? '15px'
            : hoverType === 'button'
              ? '25px'
              : hoverType === 'card'
                ? '30px'
                : '20px',
          height: hoverType === 'link'
            ? '15px'
            : hoverType === 'button'
              ? '25px'
              : hoverType === 'card'
                ? '30px'
                : '20px'
        }}
      />
      <div
        className={`custom-cursor-follower ${isHovering ? `hover-${hoverType}` : ''}`}
        style={{
          left: `${followerPosition.x}px`,
          top: `${followerPosition.y}px`,
          transform: isClicking
            ? 'translate(-50%, -50%) scale(0.8)'
            : hoverType === 'toggle'
              ? 'translate(-50%, -50%) rotate(90deg)'
              : 'translate(-50%, -50%)',
          width: isHovering ? '50px' : '40px',
          height: isHovering ? '50px' : '40px',
          borderColor: isHovering
            ? 'rgba(239, 124, 142, 0.6)'
            : 'rgba(239, 124, 142, 0.3)',
          borderWidth: isHovering ? '3px' : '2px'
        }}
      />
    </>
  );
};

export default CursorEffect;
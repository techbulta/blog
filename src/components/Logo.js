import React from 'react';

// The {b} mark plus the "bulta" wordmark. `small` is the footer size.
function Logo({ small = false }) {
  return (
    <span className={`logo${small ? ' logo--small' : ''}`}>
      <span className="logo-mark">{'{b}'}</span>
      <span className="logo-word">bulta</span>
    </span>
  );
}

export default Logo;

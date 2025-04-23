import React from 'react';
import './ErrorDisplay.css';

const ErrorDisplay = ({ error }) => {
  if (!error) return null;

  return (
    <div className="error-container">
      <h3>Error</h3>
      <p>{error}</p>
    </div>
  );
};

export default ErrorDisplay; 
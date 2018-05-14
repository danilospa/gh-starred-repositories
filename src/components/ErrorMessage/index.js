import React from 'react';
import './index.css';

const ErrorMessage = (props) => (
  <div>
    { props.message && (
      <p className="error-message">{props.message}</p>
    )}
  </div>
);

export default ErrorMessage;

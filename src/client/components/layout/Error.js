import React from 'react';

const Error = ({ error }) => (
  <div className="error">
    <h1>{error}</h1>
    <button 
        className="button--primary m-auto"
        onClick={() => {
          window.location.reload();
        }}
    >
      Retry
    </button>
  </div>
);

export default Error;

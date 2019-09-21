import React from 'react';

const NetworkError = (props) => {
  const returnHome = () => {
    props.history.push('/');
  };

  return (
    <div className="error">
      <h1>Network Error</h1>
      <p>It looks like you don't have an intenet connection</p>
      <button 
          className="button--primary" 
          onClick={returnHome}
      >
        Okay
      </button>
    </div>
  );
};

export default NetworkError;

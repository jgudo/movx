import React from 'react';

const LoadingScreen = ({ error }) => {
  /* eslint-disable */
  if (error) {
    return 'Oh nooess!';
  } else {
    return (
      <div className="loading">
        <h1>Loading... </h1>
      </div>
    );
  } 
}

export default LoadingScreen;

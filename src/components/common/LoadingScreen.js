import React from 'react';

const LoadingScreen = ({ msg }) => (
  <div className="loading__wrapper">
    <div className="loading__body">
      <div className="loading__circular" />
      <span>{msg || 'Loading'}</span>
    </div>
  </div>
);

export default LoadingScreen;

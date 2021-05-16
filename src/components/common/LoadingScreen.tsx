import React from 'react';

interface IProps {
  message?: string;
}

const LoadingScreen: React.FC<IProps> = ({ message }) => (
  <div className="loading__wrapper">
    <div className="loading__body">
      <div className="loading__circular" />
      <span>{message || 'Loading'}</span>
    </div>
  </div>
);

export default LoadingScreen;

import React from 'react';

const TopProgressLoader = ({ isLoading }) => {
  return isLoading ? (
    <div 
        className="loader" 
        id="loader">
      <div className="loader__head">
          <div className="first-indicator" />
          <div className="second-indicator" />
      </div>
    </div>
  ) : null;
};

export default TopProgressLoader;

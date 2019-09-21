import React from 'react';

const TopProgressLoader = (props) => {
  if (props.isLoading) {
    return (
      <div 
          className="loader" 
          id="loader">
        <div className="loader__head">
            <div className="first-indicator" />
            <div className="second-indicator" />
        </div>
      </div>
    );
  /* eslint no-else-return: 0 */  
  } else {
    return null;
  }
};

export default TopProgressLoader;

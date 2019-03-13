import React from 'react';
import { withRouter } from 'react-router-dom'; 

const PageNotFound = (props) => {
  const returnHome = () => {
    props.history.push('/');
  };

  return (
    <div className="not-found-page">
      <h1>The Page Your Requested Could Not Be Found</h1>
      <button 
          className="button--primary" 
          onClick={returnHome}
      >
        Go Home
      </button>
    </div>
  );
};

export default withRouter(PageNotFound);

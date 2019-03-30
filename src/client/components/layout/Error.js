import React from 'react';
import { withRouter } from 'react-router-dom'; 

const PageError = (props) => {
  const back = () => {
    props.history.push('/discover');
  };

  return (
    <div className="error">
      <h1>Page Cannot Be Displayed</h1>
      <p>A problem was encountered while fetching the data</p>
      <button 
          className="button--primary" 
          onClick={back}
      >
        Okay
      </button>
    </div>
  );
};

export default withRouter(PageError);

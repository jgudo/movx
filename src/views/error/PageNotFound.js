import React from 'react';
import useDocumentTitle from 'hooks/useDocumentTitle';

const PageNotFound = (props) => {
  useDocumentTitle('404: Page Not Found');
  const returnHome = () => {
    props.history.push('/');
  };

  return (
    <div className="error">
      <h1>The Page Your Requested Could Not Be Found</h1>
      <button
        className="button--primary"
        onClick={returnHome}
      >
        Okay
      </button>
    </div>
  );
};

export default PageNotFound;

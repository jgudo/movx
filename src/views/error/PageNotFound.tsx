import { useDocumentTitle } from '@app/hooks';
import React from 'react';
import { RouteComponentProps } from 'react-router';

const PageNotFound: React.FC<RouteComponentProps> = ({ history }) => {
  useDocumentTitle('404: Page Not Found');
  const returnHome = () => {
    history.push('/');
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

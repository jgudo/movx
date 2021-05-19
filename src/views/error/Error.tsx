import { useDocumentTitle } from '@app/hooks';
import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

const PageError: React.FC<RouteComponentProps> = ({ history }) => {
  useDocumentTitle('Error 😥');
  const back = () => {
    history.push('/discover');
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

export default PageError;

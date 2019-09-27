import React from 'react';
import { isEmpty } from 'helpers/helperFunctions'
import LoadingScreen from '../common/LoadingScreen';

const Loader = propName => (Component) => {
  return (props) => {
    return ((isEmpty(props[propName]) && props.isLoading) 
      ? (
        <React.Fragment>
          <LoadingScreen />
          <Component {...props} />
        </React.Fragment>
      ) : <Component {...props} />);
  };
};

export default Loader;

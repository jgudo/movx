import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import moviesReducer from '../reducers/moviesReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store = createStore(
    moviesReducer, 
    composeEnhancers(applyMiddleware(thunk))
  );
  return store;
};

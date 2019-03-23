import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import moviesReducer from '../reducers/moviesReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const storageName = 'movx-v2';

const localStorageMiddleware = (store) => {
  return next => (action) => {
    const result = next(action);
    try {
      localStorage.setItem(storageName, JSON.stringify(
        store.getState()
      ));
    } catch (e) {
      console.log('Error while saving in localStorage', e);
    }
    return result;
  };
};

const reHydrateStore = () => { 
  if (localStorage.getItem(storageName) !== null) {
    return JSON.parse(localStorage.getItem(storageName));
  }
  return undefined;
};

export default () => {
  const store = createStore(
    moviesReducer,
    reHydrateStore(), 
    composeEnhancers(applyMiddleware(localStorageMiddleware, thunk))
  );
  return store;
};

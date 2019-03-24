import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import moviesReducer from '../reducers/moviesReducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const storageName = 'movx-v2';

const localStorageMiddleware = (store) => {
  return next => (action) => {
    const result = next(action);
    try {
      let favorites = [...store.getState().favorites];
      // get favorites from old storage
      if (localStorage.movx) {
        const { oldFavorites } = JSON.parse(localStorage.getItem('movx'));
        favorites = [...favorites, ...oldFavorites];
        // filter if same movie was already added
        favorites = favorites.filter((e, i) => favorites.indexOf(e.id) >= i);
        localStorage.removeItem('movx');
      }

      localStorage.setItem(storageName, JSON.stringify(
        { ...store.getState(), favorites }
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

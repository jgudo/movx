import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootSaga from '../sagas/watchers';

import moviesReducer from '../reducers/moviesReducer';
import filtersReducer from '../reducers/filtersReducer';
import genreReducer from '../reducers/genreReducer';
import miscReducer from '../reducers/miscReducer';
import peopleReducer from '../reducers/peopleReducer';
import searchReducer from '../reducers/searchReducer';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const storageName = 'movx-v2';

const config = {
  key: 'movx',
  storage
};

const rootReducer = combineReducers({
  _movies: moviesReducer,
  _filters: filtersReducer,
  _genre: genreReducer,
  _misc: miscReducer,
  _people: peopleReducer,
  _search: searchReducer
});
const persistedReducer = persistReducer(config, rootReducer);

export default () => {
  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  
  return { store, persistor };
};

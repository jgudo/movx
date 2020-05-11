import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootSaga from 'sagas/watchers';
import reducers from 'reducers';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const storageName = 'movx-v2';

const config = {
  key: storageName,
  storage,
  whitelist: ['_misc', '_search', '_filters', '_genre']
};

const persistedReducer = persistReducer(config, combineReducers(reducers));

export default () => {
  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);
  
  return { store, persistor };
};

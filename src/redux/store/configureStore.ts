import reducers from '@app/redux/reducers';
import rootSaga from '@app/redux/sagas/rootSaga';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import createSagaMiddleware from 'redux-saga';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const sagaMiddleware = createSagaMiddleware();

const composeEnhancers =
  (import.meta.env.VITE_NODE_ENV !== "prod" &&
    typeof window !== 'undefined' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const storageName = 'movx-v2';

const config = {
  key: storageName,
  storage,
  whitelist: ['misc', 'search', 'filters', 'genre', 'favorites'],
};

const persistedReducer = persistReducer(config, combineReducers(reducers));

export default () => {
  const store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
  );
  const persistor = persistStore(store);
  sagaMiddleware.run(rootSaga);

  return { store, persistor };
};

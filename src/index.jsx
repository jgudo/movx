import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import WebFont from 'webfontloader';
import 'normalize.css/normalize.css';
import 'react-toastify/dist/ReactToastify.css';
import '@app/styles/style.scss';

import configureStore from '@app/redux/store/configureStore';
import AppRouter from './App';
import LoadingScreen from '@app/components/common/LoadingScreen';

WebFont.load({
  google: {
    families: ['Yantramanav: 400, 700'],
  },
});

const { store, persistor } = configureStore();

render(
  <Provider store={store}>
    <PersistGate loading={<LoadingScreen />} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

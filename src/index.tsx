import { ProgressLoader } from '@app/components/common';
import configureStore from '@app/redux/store/configureStore';
import '@app/styles/style.scss';
import 'normalize.css/normalize.css';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/integration/react';
import WebFont from 'webfontloader';
import AppRouter from './App';

WebFont.load({
  google: {
    families: ['Yantramanav: 400, 700'],
  },
});

const { store, persistor } = configureStore();

render(
  <Provider store={store}>
    <PersistGate loading={<ProgressLoader />} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>,
  document.getElementById('root'),
);

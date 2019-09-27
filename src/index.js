import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'normalize.css/normalize.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css'; 
import './styles/style.scss';
import WebFont from 'webfontloader';

import configureStore from './store/configureStore';
import AppRouter from './routers/AppRouter';
import LoadingScreen from './components/common/LoadingScreen';

WebFont.load({
  google: {
    families: ['Yantramanav: 400, 700']
  }
});

const { store, persistor } = configureStore();

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then((registration) => {
    console.log('SW registered: ', registration);
  }).catch((registrationError) => {
    console.log('SW registration failed: ', registrationError);
  });
}

render(
  <Provider store={store}>
    <PersistGate loading={<LoadingScreen />} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>,
  document.getElementById('app')
);

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css'; 
import './styles/style.scss';
import WebFont from 'webfontloader';

import configureStore from './store/configureStore';
import AppRouter from './routers/AppRouter';

WebFont.load({
  google: {
    families: ['Yantramanav: 400, 700']
  }
});

const store = configureStore();

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then((registration) => {
    console.log('SW registered: ', registration);
  }).catch((registrationError) => {
    console.log('SW registration failed: ', registrationError);
  });
}

ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById('app')
);

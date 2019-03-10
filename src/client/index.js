import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';
import './styles/style.scss';
import WebFont from 'webfontloader';

import { library } from '@fortawesome/fontawesome-svg-core';
import { 
  faHeart, 
  faSearch, 
  faAngleDoubleRight, 
  faAngleDoubleLeft, 
  faAngleRight,
  faAngleLeft
} from '@fortawesome/free-solid-svg-icons';
import configureStore from './store/configureStore';
import AppRouter from './routers/AppRouter';

// test action
// import { fetchMovies } from './actions/actions';

library.add(
  faHeart, 
  faSearch,
  faAngleDoubleRight,
  faAngleDoubleLeft,
  faAngleRight,
  faAngleLeft
);

WebFont.load({
  google: {
    families: ['Source Sans Pro: 400, 700']
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

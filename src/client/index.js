import React from 'react';
import ReactDOM from 'react-dom';
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
import AppRouter from './routers/AppRouter';

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

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then((registration) => {
    console.log('SW registered: ', registration);
  }).catch((registrationError) => {
    console.log('SW registration failed: ', registrationError);
  });
}

ReactDOM.render(<AppRouter />, document.getElementById('app'));

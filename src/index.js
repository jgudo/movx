import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import WebFont from 'webfontloader';
import { Workbox } from 'workbox-window';
import 'normalize.css/normalize.css';
import 'react-toastify/dist/ReactToastify.css';
import './styles/style.scss';

import configureStore from './store/configureStore';
import AppRouter from './routers/AppRouter';
import LoadingScreen from './components/common/LoadingScreen';

WebFont.load({
  google: {
    families: ['Yantramanav: 400, 700']
  }
});

const { store, persistor } = configureStore();

render(
  <Provider store={store}>
    <PersistGate loading={<LoadingScreen />} persistor={persistor}>
      <AppRouter />
    </PersistGate>
  </Provider>,
  document.getElementById('app')
);

if (process.env.NODE_ENV === 'production' && 'serviceWorker' in navigator) {
  window.addEventListener("load", () => {
    const wb = new Workbox("/sw.js");
    const updateButton = document.querySelector("#app-update");
    // Fires when the registered service worker has installed but is waiting to activate.
    wb.addEventListener("waiting", event => {
      updateButton.classList.add("show");
      updateButton.addEventListener("click", () => {

        wb.addEventListener("controlling", event => {
          window.location.reload();
        });

        // Send a message telling the service worker to skip waiting.
        // This will trigger the `controlling` event handler above.
        wb.messageSW({ type: "SKIP_WAITING" });
      });
    });

    wb.register();
  });
}

import React from 'react';

import ReactDOM from 'react-dom';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import * as Sentry from '@sentry/browser';

import * as serviceWorker from './serviceWorker';
import usuario from './reducers/usuario';
import pedido from './reducers/pedido';
import { loadState, saveState } from './utils/localStorage';
import { initIconLibrary } from './utils/faLibrary';

import App from './App';

import './styles/main.scss';

Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DSN,
});

initIconLibrary();

const reduxStore = configureStore({
  reducer: {
    usuario,
    pedido,
  },
  preloadedState: loadState(),
});

reduxStore.subscribe(() => {
  // We might want to debounce/throttle the saveState function
  saveState({ usuario: reduxStore.getState().usuario });
});

ReactDOM.render(
  <Provider store={reduxStore}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

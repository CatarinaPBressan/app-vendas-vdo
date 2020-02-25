import React from "react";

import ReactDOM from "react-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import * as serviceWorker from "./serviceWorker";
import usuario from "./reducers/usuario";
import pedido from "./reducers/pedido";
import { initIconLibrary } from "./utils/faIconsLibrary";
import { setUpSentry } from "./services/sentry";

import App from "./App";

import "./styles/main.scss";

setUpSentry();
initIconLibrary();

const reduxStore = configureStore({
  reducer: {
    usuario,
    pedido,
  },
});

ReactDOM.render(
  <Provider store={reduxStore}>
    <App />
  </Provider>,
  document.getElementById("root"),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

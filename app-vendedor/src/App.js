import React, { Component } from "react";

import { BrowserRouter, Switch, Route } from "react-router-dom";

import LoginPage from "./components/LoginPage";

import "./styles/main.scss";

export class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;

import React, { Component } from "react";

import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";

import LoginPage from "./components/LoginPage";

import "./styles/main.scss";

export class App extends Component {
  componentDidUpdate(prevProps) {
    if (!prevProps.user && this.props.user) {
      console.log("history should replaced");
      this.props.history.replace({ pathname: "/" });
    }
  }

  render() {
    return (
      <BrowserRouter>
        {!this.props.user ? (
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/*">
              <Redirect to="/login" />
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route path="/">
              Logged in Route {JSON.stringify(this.props.user)}
            </Route>
          </Switch>
        )}
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => ({
  user: state.account.user
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(App);

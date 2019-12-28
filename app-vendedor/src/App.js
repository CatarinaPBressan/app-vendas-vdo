import React, { Component } from "react";

import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";

import LoginPage from "./components/LoginPage";

import "./styles/main.scss";
import UserAPI from "./api/userAPI";
import { clearUser } from "./actions/account";

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  componentDidMount() {
    if (this.props.user) {
      UserAPI.checkTokenExpired(this.props.user).then(isExpired => {
        if (isExpired) {
          this.props.clearUser();
        }
        this.setState({ loading: false });
      });
    } else {
      this.setState({ loading: false });
    }
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }
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
            <Route path="/home">
              Logged in Route {JSON.stringify(this.props.user)}
            </Route>
            <Route path="/*">
              <Redirect to="/home" />
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

const mapDispatchToProps = {
  clearUser
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

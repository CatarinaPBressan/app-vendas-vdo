import React, { Component } from 'react';

import { PropTypes } from 'prop-types';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import UserAPI from './api/userAPI';
import { clearUser } from './actions/account';

import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';
import ProductPage from './components/ProductPage/ProductPage';
import PedidosPage from './components/PedidosPage/PedidosPage';
import PedidoPage from './components/PedidoPage/PedidoPage';

import './styles/main.scss';

export class App extends Component {
  static propTypes = {
    user: PropTypes.object,

    clearUser: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    if (this.props.user) {
      UserAPI.checkTokenExpired(this.props.user).then((isExpired) => {
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
            <Route path="/home" component={HomePage} />
            <Route path="/novo-pedido/:productId" component={ProductPage} />
            <Route path="/pedidos/:pedidoEid" component={PedidoPage} />
            <Route path="/pedidos" component={PedidosPage} />
            <Route path="/*">
              <Redirect to="/home" />
            </Route>
          </Switch>
        )}
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.account.user,
});

const mapDispatchToProps = {
  clearUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

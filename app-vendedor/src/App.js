import React, { Component } from 'react';

import { PropTypes } from 'prop-types';
import { Switch, Route, Redirect, BrowserRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import UsuarioAPI from './api/usuarioAPI';
import { clearUsuario } from './actions/usuario';

import HomePage from './components/HomePage/HomePage';
import LoginPage from './components/LoginPage/LoginPage';
import ProdutoPage from './components/ProdutoPage/ProdutoPage';
import PedidosPage from './components/PedidosPage/PedidosPage';
import PedidoPage from './components/PedidoPage/PedidoPage';

import './styles/main.scss';

export class App extends Component {
  static propTypes = {
    usuario: PropTypes.object,
    clearUsuario: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    if (this.props.usuario) {
      UsuarioAPI.checkTokenExpired(this.props.usuario).then((isExpired) => {
        if (isExpired) {
          this.props.clearUsuario();
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
        {!this.props.usuario ? (
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/*">
              <Redirect to="/login" />
            </Route>
          </Switch>
        ) : (
          <Switch>
            <Route path="/home" component={HomePage} />
            <Route path="/novo-pedido/:produtoId" component={ProdutoPage} />
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
  usuario: state.usuario.usuario,
});

const mapDispatchToProps = {
  clearUsuario: clearUsuario,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

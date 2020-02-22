import React, { Component } from "react";

import { PropTypes } from "prop-types";
import { Switch, Route, Redirect, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";

import { clearUsuario, getUsuario } from "./actions/usuario";

import HomePage from "./components/HomePage/HomePage";
import LoginPage from "./components/LoginPage/LoginPage";
import ProdutoPage from "./components/ProdutoPage/ProdutoPage";
import PedidosPage from "./components/PedidosPage/PedidosPage";
import PedidoPage from "./components/PedidoPage/PedidoPage";

import "./styles/main.scss";

export class App extends Component {
  static propTypes = {
    usuario: PropTypes.object,
    clearUsuario: PropTypes.func.isRequired,
    getUsuario: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  componentDidMount() {
    if (!this.props.usuario) {
      const usuarioToken = localStorage.getItem("token");
      if (usuarioToken) {
        this.props.getUsuario(usuarioToken).then(() => {
          this.setState({ loading: false });
        });
      } else {
        this.setState({ loading: false });
      }
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
  getUsuario: getUsuario,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

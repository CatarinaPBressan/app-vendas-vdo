import React, { Component } from "react";

import { PropTypes } from "prop-types";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { BreakpointProvider } from "react-socks";

import { getUsuario, clearUsuario } from "./actions/usuario";
import { fetchPedidos, addPedido } from "./actions/pedido";
import { setUpPusher, PUSHER } from "./services/pusher";

import LoginPage from "./components/LoginPage/LoginPage";
import ProdutosPage from "./components/ProdutosPage/ProdutosPage";
import ProdutoPage from "./components/ProdutoPage/ProdutoPage";
import PedidosPage from "./components/PedidosPage/PedidosPage";

import "./styles/main.scss";

class App extends Component {
  static propTypes = {
    usuario: PropTypes.object,

    getUsuario: PropTypes.func.isRequired,
    fetchPedidos: PropTypes.func.isRequired,
    addPedido: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      loading: true,
    };
  }

  async componentDidMount() {
    if (!this.props.usuario) {
      const token = localStorage.getItem("token");
      if (!token) {
        this.setState({ loading: false });
        return;
      }
      const usuario = await this.props.getUsuario(token);
      if (!usuario) {
        this.props.clearUsuario();
        this.setState({ loading: false });
        return;
      }
      await this.props.fetchPedidos(usuario);
      const pusher = setUpPusher();
      const channel = pusher.subscribe(PUSHER.PEDIDOS_CHANNEL);
      channel.bind(PUSHER.EVENT_NOVO_PEDIDO, (data) => {
        this.props.addPedido(data.pedido);
      });
    }
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    return (
      <BreakpointProvider>
        {!this.props.usuario ? (
          <LoginPage />
        ) : (
          <BrowserRouter>
            <Switch>
              <Route path="/pedidos/" component={PedidosPage} />
              <Route path="/novo-pedido/:produtoId" component={ProdutoPage} />
              <Route path="/" component={ProdutosPage} />
            </Switch>
          </BrowserRouter>
        )}
      </BreakpointProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  usuario: state.usuario.usuario,
});

const mapDispatchToProps = {
  getUsuario: getUsuario,
  fetchPedidos: fetchPedidos,
  addPedido: addPedido,
  clearUsuario: clearUsuario,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

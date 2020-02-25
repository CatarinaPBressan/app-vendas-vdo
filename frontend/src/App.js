import React, { Component } from "react";

import { PropTypes } from "prop-types";
import { Route, BrowserRouter } from "react-router-dom";
import { connect } from "react-redux";

import { getUsuario } from "./actions/usuario";
import { fetchPedidos, addPedido } from "./actions/pedido";
import { setUpPusher, PUSHER } from "./services/pusher";

import PedidosPage from "./components/PedidosPage/PedidosPage";

import "./styles/main.scss";

export class App extends Component {
  static propTypes = {
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

  componentDidMount() {
    const usuarioToken = JSON.parse(
      document.getElementById("usuario_data").value,
    ).token;

    let that = this;
    this.props
      .getUsuario(usuarioToken)
      .then(this.props.fetchPedidos)
      .then(() => {
        const pusher = setUpPusher();
        const channel = pusher.subscribe(PUSHER.PEDIDOS_CHANNEL);
        channel.bind(PUSHER.EVENT_NOVO_PEDIDO, function(data) {
          that.props.addPedido(data.pedido);
        });
      })
      .then(() => {
        this.setState({ loading: false });
      });
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }
    return (
      <BrowserRouter>
        <Route path="/" component={PedidosPage} />
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  getUsuario: getUsuario,
  fetchPedidos: fetchPedidos,
  addPedido: addPedido,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Breakpoint } from "react-socks";

import DesktopPedidosPage from "./DesktopPedidosPage";
import MobilePedidosPage from "./MobilePedidosPage";

import "./PedidosPage.scss";

class PedidosPage extends Component {
  static propTypes = {
    usuario: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    pedidos: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="pedidos-page">
        <Breakpoint medium up>
          <DesktopPedidosPage
            match={this.props.match}
            pedidos={this.props.pedidos}
          />
        </Breakpoint>
        <Breakpoint small down>
          <MobilePedidosPage
            match={this.props.match}
            pedidos={this.props.pedidos}
          />
        </Breakpoint>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  usuario: state.usuario.usuario,
  pedidos: state.pedido.pedidos,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PedidosPage);

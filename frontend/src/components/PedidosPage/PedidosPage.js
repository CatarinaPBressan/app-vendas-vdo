import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Breakpoint } from "react-socks";

import Page from "../common/Page";
import DesktopPedidosPage from "./desktop/DesktopPedidosPage";
import MobilePedidosPage from "./mobile/MobilePedidosPage";

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
      <Page
        pageClassNames="pedidos-page"
        usuario={this.props.usuario}
        location={this.props.location}
        history={this.props.history}
      >
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
      </Page>
    );
  }
}

const mapStateToProps = (state) => ({
  usuario: state.usuario.usuario,
  pedidos: state.pedido.pedidos,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PedidosPage);

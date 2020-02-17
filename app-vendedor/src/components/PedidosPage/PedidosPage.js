import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Page from '../common/Page';
import PedidosNav from './PedidosNav';

import './PedidosPage.scss';

export class PedidosPage extends Component {
  static propTypes = {
    usuario: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    pedidos: PropTypes.array.isRequired,
  };

  render() {
    return (
      <Page
        pageClassNames="pedidos-page"
        usuario={this.props.usuario}
        location={this.props.location}
      >
        <PedidosNav pedidos={this.props.pedidos} />
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

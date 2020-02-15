import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Page } from '../common/Page';

export class PedidosPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      pedidos: this.flattenAndOrderPedidos(props.pedidos),
    };
  }

  flattenAndOrderPedidos = (pedidosMap) => {
    const entries = pedidosMap.entries;
    if (!entries) {
      return [];
    }
    const pedidos = pedidosMap.entries.map(([eid, pedido]) => pedido);
    return pedidos.sort((a, b) => {
      if (a.created_date < b.created_date) {
        return -1;
      }
      return 1;
    });
  };

  static propTypes = {
    user: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    pedidos: PropTypes.object.isRequired,
  };

  render() {
    return (
      <Page
        pageClassNames="pedidos-page"
        user={this.props.user}
        location={this.props.location}
      >
        {this.state.pedidos.length ? (
          <div></div>
        ) : (
          <div>Sem pedidos para mostrar</div>
        )}
      </Page>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.account.user,
  pedidos: state.pedido.pedidos,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PedidosPage);

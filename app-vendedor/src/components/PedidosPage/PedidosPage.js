import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Page } from '../common/Page';

export class PedidosPage extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    pedidos: PropTypes.array.isRequired,
  };

  render() {
    return (
      <Page
        pageClassNames="pedidos-page"
        user={this.props.user}
        location={this.props.location}
      >
        {this.props.pedidos.length ? (
          <div>
            {this.props.pedidos.map((pedido) => (
              <div key={pedido.eid}>
                EID: {pedido.eid}
                <br />
                Status: {pedido.status}
                <br />
                Nome: {pedido.data.nome} <br />
              </div>
            ))}
          </div>
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

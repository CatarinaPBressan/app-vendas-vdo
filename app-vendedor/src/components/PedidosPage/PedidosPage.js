import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Page } from '../common/Page';
import PedidoCard from './PedidoCard';

import './PedidosPage.scss';

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
              <PedidoCard key={pedido.eid} pedido={pedido} />
            ))}
          </div>
        ) : (
          <div className="no-pedidos">
            <div>Sem pedidos para mostrar</div>
            <FontAwesomeIcon icon="frown" />
          </div>
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

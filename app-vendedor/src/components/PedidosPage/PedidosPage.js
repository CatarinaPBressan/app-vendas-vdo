import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Route, Switch, Link } from 'react-router-dom';

import { Page } from '../common/Page';
import PedidosNav from './PedidosNav';

import './PedidosPage.scss';

export class PedidosPage extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    pedidos: PropTypes.array.isRequired,
    match: PropTypes.object.isRequired,
  };

  getPedido = (pedidoEid) => {
    return this.props.pedidos.find((pedido) => pedido.eid === pedidoEid);
  };

  render() {
    const { match } = this.props;
    return (
      <Page
        pageClassNames="pedidos-page"
        user={this.props.user}
        location={this.props.location}
      >
        <Switch>
          <Route path={`${match.url}/:pedidoId`}>
            {({ match }) => (
              <div>
                <Link to="/pedidos">Voltar</Link>
                {JSON.stringify(this.getPedido(match.params.pedidoId))}
              </div>
            )}
          </Route>
          <Route path={match.url}>
            <PedidosNav pedidos={this.props.pedidos} />
          </Route>
        </Switch>
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

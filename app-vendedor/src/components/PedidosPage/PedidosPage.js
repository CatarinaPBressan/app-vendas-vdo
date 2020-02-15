import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Page } from '../common/Page';

export class PedidoPage extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  };

  render() {
    return (
      <Page
        pageClassNames="pedidos-page"
        user={this.props.user}
        location={this.props.location}
      >
        <div>PedidoPage</div>
      </Page>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.account.user,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PedidoPage);

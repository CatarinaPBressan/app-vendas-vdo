import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { Container } from 'react-bootstrap';

import AppNavbar from './AppNavbar';

export class Page extends Component {
  static propTypes = {
    pageClassNames: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    user: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  };
  render() {
    return (
      <div className={this.props.pageClassNames}>
        <AppNavbar user={this.props.user} location={this.props.location} />
        <Container>{this.props.children}</Container>
      </div>
    );
  }
}

export default Page;

import React, { Component } from "react";

import PropTypes from "prop-types";
import { Container } from "react-bootstrap";

import AppNavbar from "./AppNavbar";

class Page extends Component {
  static propTypes = {
    pageClassNames: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
    usuario: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };
  render() {
    return (
      <div className={this.props.pageClassNames}>
        <AppNavbar
          usuario={this.props.usuario}
          location={this.props.location}
          history={this.props.history}
        />
        <Container>{this.props.children}</Container>
      </div>
    );
  }
}

export default Page;

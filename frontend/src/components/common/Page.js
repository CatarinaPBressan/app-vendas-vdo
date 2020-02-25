import React, { Component } from "react";

import PropTypes from "prop-types";
import { Container } from "react-bootstrap";

import AppNavbar from "./AppNavbar";

class Page extends Component {
  static propTypes = {
    pageClassNames: PropTypes.string.isRequired,
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div className={this.props.pageClassNames}>
        <AppNavbar />
        <Container>{this.props.children}</Container>
      </div>
    );
  }
}

export default Page;

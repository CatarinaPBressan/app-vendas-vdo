import React, { Component } from "react";

import { Navbar } from "react-bootstrap";

class AppNavbar extends Component {
  static propTypes = {};

  render() {
    return (
      <Navbar bg="dark" collapseOnSelect expand="sm" variant="dark">
        <Navbar.Brand> App Vendas - Listagem de pedidos </Navbar.Brand>
      </Navbar>
    );
  }
}

export default AppNavbar;

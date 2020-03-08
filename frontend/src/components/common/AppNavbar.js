import React, { Component } from "react";

import { PropTypes } from "prop-types";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { LinkContainer } from "react-router-bootstrap";
import { connect } from "react-redux";

import { clearUsuario } from "../../actions/usuario";
import { clearPedidos } from "../../actions/pedido";

const LINKS = [
  { href: "/", icon: "plus", label: "Novo Pedido", exact: true },
  { href: "/pedidos/", icon: "clipboard", label: "Pedidos", exact: false },
];

class AppNavbar extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    usuario: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,

    clearUsuario: PropTypes.func.isRequired,
    clearPedidos: PropTypes.func.isRequired,
  };

  onLogoutClick = () => {
    this.props.history.replace("/");
    this.props.clearUsuario();
    this.props.clearPedidos();
  };

  render() {
    return (
      <Navbar bg="light" collapseOnSelect expand="sm" variant="light">
        <Navbar.Brand> App Vendas - Promotores </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="main-collapse">
          <Nav className="mr-auto">
            {LINKS.map((link) => (
              <LinkContainer to={link.href} key={link.href} exact={link.exact}>
                <Nav.Link>
                  <FontAwesomeIcon icon={link.icon} /> {link.label}
                </Nav.Link>
              </LinkContainer>
            ))}
          </Nav>

          <Nav>
            <NavDropdown
              alignRight
              title={
                <span>
                  <FontAwesomeIcon icon="cog" /> Configurações
                </span>
              }
            >
              <NavDropdown.Item>
                <FontAwesomeIcon icon="user-cog" /> <b>Perfil</b>:{" "}
                {this.props.usuario.nome}
              </NavDropdown.Item>
              <NavDropdown.Item as="button" onClick={this.onLogoutClick}>
                <FontAwesomeIcon icon="sign-out-alt" /> <b>Sair</b>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

const mapStateToProps = (state) => ({
  usuario: state.usuario.usuario,
});

const mapDispatchToProps = {
  clearUsuario,
  clearPedidos,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavbar);

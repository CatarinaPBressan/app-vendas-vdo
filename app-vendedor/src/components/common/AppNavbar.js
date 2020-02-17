import React, { Component } from 'react';

import { PropTypes } from 'prop-types';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { LinkContainer } from 'react-router-bootstrap';

const LINKS = [
  { href: '/home', icon: 'plus', label: 'Novo Pedido' },
  { href: '/pedidos', icon: 'clipboard', label: 'Pedidos' },
];

class AppNavbar extends Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    usuario: PropTypes.object.isRequired,
  };

  render() {
    return (
      <Navbar bg="light" collapseOnSelect expand="sm" variant="light">
        <Navbar.Brand> App Vendas - Promotores </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse id="main-collapse">
          <Nav className="mr-auto">
            {LINKS.map((link) => (
              <LinkContainer to={link.href} key={link.href}>
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
                <FontAwesomeIcon icon="user-cog" /> Perfil:
                <b>{this.props.usuario.name}</b>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

export default AppNavbar;

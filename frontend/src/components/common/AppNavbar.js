import React from "react";

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

const AppNavbar = ({ clearUsuario, clearPedidos, usuario }) => {
  const onLogoutClick = () => {
    clearUsuario();
    clearPedidos();
  };

  return (
    <Navbar bg="light" collapseOnSelect expand="sm" variant="light">
      <Navbar.Brand>App Vendas</Navbar.Brand>
      {usuario && (
        <>
          <Navbar.Toggle />
          <Navbar.Collapse id="main-collapse">
            <Nav className="mr-auto">
              {LINKS.map((link) => (
                <LinkContainer
                  to={link.href}
                  key={link.href}
                  exact={link.exact}
                >
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
                  {usuario.nome}
                </NavDropdown.Item>
                <NavDropdown.Item as="button" onClick={onLogoutClick}>
                  <FontAwesomeIcon icon="sign-out-alt" /> <b>Sair</b>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </>
      )}
    </Navbar>
  );
};

const mapStateToProps = (state) => ({
  usuario: state.usuario.usuario,
});

const mapDispatchToProps = {
  clearUsuario,
  clearPedidos,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppNavbar);

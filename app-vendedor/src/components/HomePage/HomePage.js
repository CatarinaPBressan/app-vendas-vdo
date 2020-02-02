import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Navbar, NavDropdown, Nav, Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import ProductCard from './ProductCard';

import './HomePage.scss';

const produtos = [
  {
    name: 'Seguro Residencial',
    icon: 'house-damage',
  },
  {
    name: 'Previdência Privada',
    icon: 'chart-line',
  },
  {
    name: 'Vida Individual',
    icon: 'heartbeat',
  },
  {
    name: 'Plano Odontológico',
    icon: 'tooth',
  },
  {
    name: 'Seguro Automóveis',
    icon: 'car-crash',
  },
  {
    name: 'Consórcios Imóveis',
    icon: 'home',
  },
  {
    name: 'Consórcios Automóveis',
    icon: 'car',
  },
  {
    name: 'Consórcios Motocicletas',
    icon: 'motorcycle',
  },
  {
    name: 'Seguro Smartphones',
    icon: 'mobile-alt',
  },
  {
    name: 'Cartão de crédito',
    icon: 'credit-card',
  },
];

class HomePage extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="home-page">
        <Navbar bg="light" collapseOnSelect expand="sm" variant="light">
          <Navbar.Brand> App Vendas - Promotores </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse id="main-collapse">
            <Nav className="mr-auto">
              <Nav.Link>
                <FontAwesomeIcon icon="clipboard" /> Pedidos
              </Nav.Link>
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
                  <b>{this.props.user.name}</b>
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
        <Container>
          <div className="products-container">
            {produtos.map((produto) => (
              <ProductCard
                key={produto.name}
                name={produto.name}
                icon={produto.icon}
              />
            ))}
          </div>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.account.user,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container } from 'react-bootstrap';

import Navbar from '../common/Navbar';
import ProductCard from './ProductCard';

import { PRODUCTS } from '../../definitions/products';

import './HomePage.scss';

class HomePage extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  };

  render() {
    return (
      <div className="home-page">
        <Navbar user={this.props.user} location={this.props.location} />
        <Container>
          <div className="products-container">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
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

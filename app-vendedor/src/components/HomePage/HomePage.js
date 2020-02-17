import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ProductCard from './ProductCard';
import Page from '../common/Page';

import { PRODUCTS } from '../../definitions/products';

import './HomePage.scss';

class HomePage extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
  };

  render() {
    return (
      <Page
        user={this.props.user}
        location={this.props.location}
        pageClassNames="home-page"
      >
        <div className="products-container">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Page>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.account.user,
});
const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

import React, { Component } from 'react';

import { PropTypes } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './ProductCard.scss';

class ProductCard extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
  };

  render() {
    return (
      <div className="product-card">
        <div className="icon-container">
          <FontAwesomeIcon icon={this.props.icon} className="product-icon" />
        </div>
        <div className="card-label">{this.props.name}</div>
      </div>
    );
  }
}

export default ProductCard;

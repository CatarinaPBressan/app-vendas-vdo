import React, { Component } from 'react';

import { PropTypes } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import './ProductCard.scss';

class ProductCard extends Component {
  static propTypes = {
    product: PropTypes.shape({
      name: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    const { icon, name, id } = this.props.product;
    return (
      <Link to={`/novo-pedido/${id}`} className="product-card">
        <div className="icon-container">
          <FontAwesomeIcon icon={icon} className="product-icon" />
        </div>
        <div className="card-label">{name}</div>
      </Link>
    );
  }
}

export default ProductCard;

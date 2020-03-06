import React, { Component } from 'react';

import { PropTypes } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import './ProdutoCard.scss';

class ProdutoCard extends Component {
  static propTypes = {
    produto: PropTypes.shape({
      nome: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      icone: PropTypes.string.isRequired,
    }).isRequired,
  };

  render() {
    const { icone, nome, id } = this.props.produto;
    return (
      <Link to={`/novo-pedido/${id}`} className="product-card">
        <div className="icon-container">
          <FontAwesomeIcon icon={icone} className="product-icon" />
        </div>
        <div className="card-label">{nome}</div>
      </Link>
    );
  }
}

export default ProdutoCard;

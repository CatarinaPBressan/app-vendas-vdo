import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import './PedidoCard.scss';
import { getProduct } from '../../utils/getProduct';

const STATUS_MAP = {
  NEW: 'Novo',
  CREDIT_CHECK: 'Análise de Crédito',
  CANCELED: 'Cancelado',
  APPROVED: 'Aprovado',
};

const PedidoCard = (props) => {
  return (
    <Link to={`/pedidos/${props.pedido.eid}`} className="pedido-card">
      <span className="data-container">
        <div>
          <b>Nome:</b> {props.pedido.data.nome}
        </div>
        <div>
          <b>CPF:</b> {props.pedido.data.cpf}
        </div>
        <div>
          <b>Status:</b> {STATUS_MAP[props.pedido.status]}
        </div>
        <div>
          <b>Produto: {getProduct(props.pedido.product).name}</b>
        </div>
      </span>
      <span className="icon-container">
        <FontAwesomeIcon icon="chevron-right" />
      </span>
    </Link>
  );
};

export default PedidoCard;

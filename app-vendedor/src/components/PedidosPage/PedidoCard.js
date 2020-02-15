import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './PedidoCard.scss';
import { getProduct } from '../../utils/getProduct';

const STATUS_MAP = {
  NEW: 'Novo',
  CREDIT_CHECK: 'Análise de Crédito',
  CANCELED: 'Cancelado',
  APPROVED: 'Aprovado',
};

export const PedidoCard = (props) => {
  return (
    <div className="pedido-card">
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
    </div>
  );
};

export default PedidoCard;

import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './PedidoCard.scss';

const STATUS_MAP = {
  NEW: 'Novo',
  CREDIT_CHECK: 'Análise de Crédito',
  CANCELED: 'Cancelado',
  APPROVED: 'Aprovado',
};

const PRODUCT_MAP = {
  'cartao-de-credito': 'Cartão de Crédito',
};

export const PedidoCard = (props) => {
  return (
    <div key={props.pedido.eid} className="pedido-card">
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
          <b>Produto: {PRODUCT_MAP[props.pedido.product]}</b>
        </div>
      </span>
      <span className="icon-container">
        <FontAwesomeIcon icon="chevron-right" />
      </span>
    </div>
  );
};

export default PedidoCard;

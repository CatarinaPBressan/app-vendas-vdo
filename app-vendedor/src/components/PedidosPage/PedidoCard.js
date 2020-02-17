import React from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import './PedidoCard.scss';
import { getProduto } from '../../utils/getProduto';

const STATUS_MAP = {
  NOVO: 'Novo',
  ANALISE_DE_CREDITO: 'Análise de Crédito',
  CANCELADO: 'Cancelado',
  APROVADO: 'Aprovado',
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
          <b>Produto: {getProduto(props.pedido.produto).nome}</b>
        </div>
      </span>
      <span className="icon-container">
        <FontAwesomeIcon icon="chevron-right" />
      </span>
    </Link>
  );
};

export default PedidoCard;

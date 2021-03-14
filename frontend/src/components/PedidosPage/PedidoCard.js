import React from "react";

import { Link } from "react-router-dom";

import { PRODUTOS } from "../../constants/produtos";
import { PEDIDO_STATUS_LABELS } from "../../constants/pedidoStatus";

import "./PedidoCard.scss";

const PedidoCard = ({ pedido, match }) => {
  return (
    <Link to={`${match.path}${pedido.eid}`} className="pedido-card">
      <span className="data-container">
        <div>
          <b>Nome:</b> {pedido.nome_completo}
        </div>
        <div>
          <b>CPF:</b> {pedido.cpf}
        </div>
        <div>
          <b>Status:</b> {PEDIDO_STATUS_LABELS[pedido.status]}
        </div>
        <div>
          <b>Produto:</b> <b>{PRODUTOS[pedido.produto_slug].nome}</b>
        </div>
        <div>
          <b>Vendedor:</b> {pedido.usuario.nome}
        </div>
      </span>
    </Link>
  );
};

export default PedidoCard;

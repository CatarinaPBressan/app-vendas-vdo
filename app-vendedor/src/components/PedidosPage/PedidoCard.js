import React from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { PRODUTOS } from "../../definitions/produtos";

import "./PedidoCard.scss";

const STATUS_MAP = {
  NOVO: "Novo",
  ANALISE_DE_CREDITO: "Análise de Crédito",
  CANCELADO: "Cancelado",
  APROVADO: "Aprovado",
};

const PedidoCard = (props) => {
  return (
    <Link to={`/pedidos/${props.pedido.eid}`} className="pedido-card">
      <span className="data-container">
        <div>
          <b>Nome:</b> {props.pedido.nome_completo}
        </div>
        <div>
          <b>CPF:</b> {props.pedido.cpf}
        </div>
        <div>
          <b>Status:</b> {STATUS_MAP[props.pedido.status]}
        </div>
        <div>
          <b>Produto: {PRODUTOS[props.pedido.produto_slug].nome}</b>
        </div>
      </span>
      <span className="icon-container">
        <FontAwesomeIcon icon="chevron-right" />
      </span>
    </Link>
  );
};

export default PedidoCard;

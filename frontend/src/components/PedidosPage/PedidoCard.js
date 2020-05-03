import React from "react";

import { Link } from "react-router-dom";

import { PRODUTOS } from "../../constants/produtos";
import { STATUS_MAP } from "../../constants/pedidos";

import "./PedidoCard.scss";

const PedidoCard = (props) => {
  return (
    <Link to={`${props.match.path}${props.pedido.eid}`} className="pedido-card">
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
          <b>Produto:</b> <b>{PRODUTOS[props.pedido.produto_slug].nome}</b>
        </div>
        <div>
          <b>Vendedor:</b> {props.pedido.usuario.nome}
        </div>
      </span>
    </Link>
  );
};

export default PedidoCard;

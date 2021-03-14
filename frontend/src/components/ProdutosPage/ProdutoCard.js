import React from "react";

import { Link } from "react-router-dom";

import "./ProdutoCard.scss";

export const ProdutoCard = ({ produto }) => {
  return (
    <Link to={`/novo-pedido/${produto.id}`} className="product-card">
      <div className="icon-container">{produto.icone}</div>
      <div className="card-label">{produto.nome}</div>
    </Link>
  );
};

import React from "react";

import PedidoCard from "./PedidoCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./PedidosNav.scss";

const PedidosNav = (props) => {
  const pedidos = Object.values(props.pedidos).sort((a, b) => {
    if (a.created_at > b.created_at) {
      return -1;
    }
    if (a.created_at < b.created_at) {
      return 1;
    }
    return 0;
  });
  return (
    <div className="pedidos-nav">
      {pedidos.length ? (
        <div>
          {pedidos.map((pedido) => (
            <PedidoCard match={props.match} key={pedido.eid} pedido={pedido} />
          ))}
        </div>
      ) : (
        <div className="no-pedidos">
          <div>Sem pedidos para mostrar</div>
          <FontAwesomeIcon icon="frown" />
        </div>
      )}
    </div>
  );
};

export default PedidosNav;

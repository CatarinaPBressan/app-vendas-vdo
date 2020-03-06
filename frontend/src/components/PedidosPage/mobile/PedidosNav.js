import React from "react";

import PedidoCard from "./PedidoCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./PedidosNav.scss";

const PedidosNav = (props) => {
  const pedidos = Object.values(props.pedidos);
  return (
    <div className="pedidos-nav">
      {pedidos.length ? (
        <>
          {pedidos.map((pedido) => (
            <PedidoCard match={props.match} key={pedido.eid} pedido={pedido} />
          ))}
        </>
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

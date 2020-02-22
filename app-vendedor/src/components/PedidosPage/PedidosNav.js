import React from "react";

import PedidoCard from "./PedidoCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PedidosNav = (props) => {
  const pedidos = Object.values(props.pedidos);
  return (
    <div>
      {pedidos.length ? (
        <div>
          {pedidos.map((pedido) => (
            <PedidoCard key={pedido.eid} pedido={pedido} />
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

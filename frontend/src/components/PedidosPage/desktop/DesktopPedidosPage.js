import React from "react";

import { Route } from "react-router-dom";

import PedidosNav from "./PedidosNav";
import PedidoDisplay from "./PedidoDisplay";

const DesktopPedidosPage = (props) => {
  return (
    <>
      <PedidosNav match={props.match} pedidos={props.pedidos} />
      <Route exact path={`${props.match.path}`}>
        <div style={{ flex: "4 0 auto" }}>Selecione um pedido</div>
      </Route>
      <Route path={`${props.match.path}:pedidoEid`} component={PedidoDisplay} />
    </>
  );
};

export default DesktopPedidosPage;

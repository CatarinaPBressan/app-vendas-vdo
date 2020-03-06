import React from "react";

import { Route } from "react-router-dom";

import PedidosNav from "./PedidosNav";
import PedidoDisplay from "./PedidoDisplay";

import "./MobilePedidosPage.scss";

const MobilePedidosPage = (props) => {
  return (
    <>
      <Route exact path={`${props.match.path}`}>
        <PedidosNav pedidos={props.pedidos} />
      </Route>
      <Route
        exact
        path={`${props.match.path}:pedidoEid`}
        component={PedidoDisplay}
      />
    </>
  );
};

export default MobilePedidosPage;

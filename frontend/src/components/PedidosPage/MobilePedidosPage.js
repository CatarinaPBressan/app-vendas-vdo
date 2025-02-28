import React from "react";

import { Route, Switch, Redirect } from "react-router-dom";

import PedidosNav from "./PedidosNav";
import PedidoDisplay from "./PedidoDisplay";

const MobilePedidosPage = (props) => {
  return (
    <Switch>
      <Route exact path={`${props.match.path}`}>
        <PedidosNav match={props.match} pedidos={props.pedidos} />
      </Route>
      <Route
        exact
        path={`${props.match.path}:pedidoEid`}
        component={PedidoDisplay}
      />
      <Route path="*">
        <Redirect to="/" />
      </Route>
    </Switch>
  );
};

export default MobilePedidosPage;

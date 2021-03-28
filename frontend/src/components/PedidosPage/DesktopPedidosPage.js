import React from "react";

import { Switch, Route, Redirect } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import PedidosNav from "./PedidosNav";
import PedidoDisplay from "./PedidoDisplay";

import "./DesktopPedidosPage.scss";

const DesktopPedidosPage = (props) => {
  return (
    <Row>
      <Col md={4} id="pedido-nav-container">
        <PedidosNav match={props.match} pedidos={props.pedidos} />
      </Col>
      <Col md={8} id="pedido-display-container">
        <Switch>
          <Route path={`${props.match.path}`} exact>
            <div>Selecione um pedido</div>
          </Route>
          <Route
            path={`${props.match.path}:pedidoEid`}
            exact
            component={PedidoDisplay}
          />
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Col>
    </Row>
  );
};

export default DesktopPedidosPage;

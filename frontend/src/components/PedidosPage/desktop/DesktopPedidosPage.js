import React from "react";

import { Route } from "react-router-dom";
import { Row, Col } from "react-bootstrap";

import PedidosNav from "./PedidosNav";
import PedidoDisplay from "./PedidoDisplay";

const DesktopPedidosPage = (props) => {
  return (
    <Row>
      <Col md={4}>
        <PedidosNav match={props.match} pedidos={props.pedidos} />
      </Col>
      <Col>
        <Route exact path={`${props.match.path}`}>
          <div>Selecione um pedido</div>
        </Route>
        <Route
          path={`${props.match.path}:pedidoEid`}
          component={PedidoDisplay}
        />
      </Col>
    </Row>
  );
};

export default DesktopPedidosPage;

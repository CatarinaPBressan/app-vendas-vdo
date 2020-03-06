import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Form, Card, Col } from "react-bootstrap";

import CartaoDeCredito from "./produtos/CartaoDeCredito";

import { fetchPedidoProduto } from "../../../actions/pedido";

import "./PedidoDisplay.scss";

const PedidoDisplay = (props) => {
  const pedido = props.pedidos[props.match.params.pedidoEid];
  useEffect(() => {
    if (!pedido.produto) {
      props.fetchPedidoProduto(pedido, props.usuario);
    }
  });

  const ProductDisplay = {
    "cartao-de-credito": CartaoDeCredito,
  }[pedido.produto_slug];

  return (
    <div className="pedido-display">
      <Card>
        <Card.Header>Dados básicos</Card.Header>
        <Card.Body>
          <Form.Row>
            <Form.Group controlId="nome" as={Col} lg={8}>
              <Form.Label>Nome Completo</Form.Label>
              <Form.Control plaintext readOnly value={pedido.nome_completo} />
            </Form.Group>
            <Form.Group controlId="cpf" as={Col}>
              <Form.Label>CPF</Form.Label>
              <Form.Control plaintext readOnly value={pedido.cpf} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="email" as={Col} lg={8}>
              <Form.Label>Email</Form.Label>
              <Form.Control plaintext readOnly value={pedido.email} />
            </Form.Group>
            <Form.Group controlId="telefone_celular" as={Col}>
              <Form.Label>Telefone Celular</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={pedido.telefone_celular}
              />
            </Form.Group>
          </Form.Row>
        </Card.Body>
      </Card>
      {pedido.produto ? (
        <ProductDisplay data={pedido.produto} />
      ) : (
        <div>Carregando dados</div>
      )}
      <Card>
        <Card.Header>Observações</Card.Header>
        <Card.Body>
          <Form.Group controlId="observacoes">
            <Form.Control
              name="observacoes"
              as="textarea"
              disabled
              value={pedido.observacoes}
            />
          </Form.Group>
        </Card.Body>
      </Card>
    </div>
  );
};

const mapStateToProps = (state) => ({
  pedidos: state.pedido.pedidos,
  usuario: state.usuario.usuario,
});

const mapDispatchToProps = {
  fetchPedidoProduto,
};

export default connect(mapStateToProps, mapDispatchToProps)(PedidoDisplay);

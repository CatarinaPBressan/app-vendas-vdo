import React, { useEffect } from "react";
import { connect } from "react-redux";

import { Button, Form, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import Page from "../common/Page";
import CartaoDeCredito from "./produtos/CartaoDeCredito";

import { fetchPedidoProduto } from "../../actions/pedido";

import "./PedidoPage.scss";

const PedidoPage = (props) => {
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
    <Page
      pageClassNames="pedido-page"
      usuario={props.usuario}
      location={props.location}
    >
      <Button
        as={Link}
        to="/pedidos"
        className="back-button"
        variant="outline-secondary"
        size="lg"
        block
      >
        <FontAwesomeIcon icon="chevron-left" />
        <span className="label">Voltar</span>
      </Button>

      <Card>
        <Card.Header>Dados básicos</Card.Header>
        <Card.Body>
          <Form.Group controlId="nome">
            <Form.Label>Nome Completo</Form.Label>
            <Form.Control
              plaintext
              readOnly
              defaultValue={pedido.nome_completo}
            />
          </Form.Group>
          <Form.Group controlId="cpf">
            <Form.Label>CPF</Form.Label>
            <Form.Control plaintext readOnly defaultValue={pedido.cpf} />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control plaintext readOnly defaultValue={pedido.email} />
          </Form.Group>
          <Form.Group controlId="telefone_celular">
            <Form.Label>Telefone Celular</Form.Label>
            <Form.Control
              plaintext
              readOnly
              defaultValue={pedido.telefone_celular}
            />
          </Form.Group>
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
              defaultValue={pedido.observacoes}
            />
          </Form.Group>
        </Card.Body>
      </Card>
      <Button
        as={Link}
        to="/pedidos"
        className="back-button"
        variant="outline-secondary"
        size="lg"
        block
      >
        <FontAwesomeIcon icon="chevron-left" />
        <span className="label">Voltar</span>
      </Button>
    </Page>
  );
};

const mapStateToProps = (state) => ({
  usuario: state.usuario.usuario,
  pedidos: state.pedido.pedidos,
});

const mapDispatchToProps = {
  fetchPedidoProduto,
};

export default connect(mapStateToProps, mapDispatchToProps)(PedidoPage);

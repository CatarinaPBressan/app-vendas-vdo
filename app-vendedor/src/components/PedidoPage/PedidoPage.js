import React from 'react';
import { connect } from 'react-redux';

import { Button, Form, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import Page from '../common/Page';
import CartaoDeCredito from './produtos/CartaoDeCredito';

import { getPedido } from '../../utils/getPedido';

import './PedidoPage.scss';
// TODO: Carregar Dinamicamente o produto

const PedidoPage = (props) => {
  const pedido = getPedido(props.pedidos, props.match.params.pedidoEid);
  const ProductDisplay = {
    'cartao-de-credito': CartaoDeCredito,
  }[pedido.product];
  return (
    <Page
      pageClassNames="pedido-page"
      user={props.user}
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
            <Form.Control plaintext readOnly defaultValue={pedido.data.nome} />
          </Form.Group>
          <Form.Group controlId="cpf">
            <Form.Label>CPF</Form.Label>
            <Form.Control plaintext readOnly defaultValue={pedido.data.cpf} />
          </Form.Group>
          <Form.Group controlId="email">
            <Form.Label>Email</Form.Label>
            <Form.Control plaintext readOnly defaultValue={pedido.data.email} />
          </Form.Group>
          <Form.Group controlId="telefone_celular">
            <Form.Label>Telefone Celular</Form.Label>
            <Form.Control
              plaintext
              readOnly
              defaultValue={pedido.data.telefone_celular}
            />
          </Form.Group>
        </Card.Body>
      </Card>
      <ProductDisplay data={pedido.data} />
      <Card>
        <Card.Header>Observações</Card.Header>
        <Card.Body>
          <Form.Group controlId="observacoes">
            <Form.Control
              name="observacoes"
              as="textarea"
              disabled
              defaultValue={pedido.data.observacoes}
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
  user: state.account.user,
  pedidos: state.pedido.pedidos,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PedidoPage);

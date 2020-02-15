import React from 'react';
import { connect } from 'react-redux';

import { Button, Form, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

import { getPedido } from '../../utils/getPedido';

import { Page } from '../common/Page';

import './PedidoPage.scss';
// TODO: Carregar Dinamicamente o produto

const PedidoPage = (props) => {
  const pedido = getPedido(props.pedidos, props.match.params.pedidoEid);
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
      <Card>
        <Card.Header>Cartão de Crédito</Card.Header>
        <Card.Body>
          <Form.Group controlId="cep">
            <Form.Label>CEP</Form.Label>
            <Form.Control plaintext readOnly defaultValue={pedido.data.cep} />
          </Form.Group>
          <Form.Group controlId="estado">
            <Form.Label>UF</Form.Label>
            <Form.Control
              plaintext
              readOnly
              defaultValue={pedido.data.estado}
            />
          </Form.Group>
          <Form.Group controlId="cidade">
            <Form.Label>Cidade</Form.Label>
            <Form.Control
              plaintext
              readOnly
              defaultValue={pedido.data.cidade}
            />
          </Form.Group>
          <Form.Group controlId="logradouro">
            <Form.Label>Logradouro / Rua</Form.Label>
            <Form.Control
              plaintext
              readOnly
              defaultValue={pedido.data.logradouro}
            />
          </Form.Group>
          <Form.Group controlId="endereco_numero">
            <Form.Label>Número</Form.Label>
            <Form.Control
              plaintext
              readOnly
              defaultValue={pedido.data.endereco_numero}
            />
          </Form.Group>
          <Form.Group controlId="complemento">
            <Form.Label>Complemento</Form.Label>
            <Form.Control
              plaintext
              readOnly
              defaultValue={pedido.data.complemento}
            />
          </Form.Group>
          <Form.Group controlId="estado_civil">
            <Form.Label>Estado Civil</Form.Label>
            <Form.Control
              plaintext
              readOnly
              defaultValue={pedido.data.estado_civil}
            />
          </Form.Group>
          <Form.Group controlId="ocupacao">
            <Form.Label>Ocupação</Form.Label>
            <Form.Control
              plaintext
              readOnly
              defaultValue={pedido.data.ocupacao}
            />
          </Form.Group>
          <Form.Group controlId="nome_mae">
            <Form.Label>Nome da Mãe</Form.Label>
            <Form.Control
              plaintext
              readOnly
              defaultValue={pedido.data.nome_mae}
            />
          </Form.Group>
          <Form.Group controlId="data_vencimento">
            <Form.Label>Data de Vencimento</Form.Label>
            <Form.Control
              plaintext
              readOnly
              defaultValue={pedido.data.data_vencimento}
            />
          </Form.Group>
        </Card.Body>
      </Card>
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

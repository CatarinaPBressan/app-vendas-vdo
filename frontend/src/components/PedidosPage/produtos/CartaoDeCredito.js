import React from "react";
import { Card, Form, Col } from "react-bootstrap";

const CartaoDeCredito = (props) => {
  return (
    <Card>
      <Card.Header>Cartão de Crédito</Card.Header>
      <Card.Body>
        <Form.Row>
          <Form.Group controlId="cep" as={Col} lg={4}>
            <Form.Label>CEP</Form.Label>
            <Form.Control plaintext readOnly value={props.data.cep} />
          </Form.Group>
          <Form.Group controlId="uf" as={Col} lg={4}>
            <Form.Label>UF</Form.Label>
            <Form.Control plaintext readOnly value={props.data.uf} />
          </Form.Group>
          <Form.Group controlId="cidade" as={Col} lg={4}>
            <Form.Label>Cidade</Form.Label>
            <Form.Control plaintext readOnly value={props.data.cidade} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId="logradouro" as={Col}>
            <Form.Label>Logradouro / Rua</Form.Label>
            <Form.Control plaintext readOnly value={props.data.logradouro} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId="endereco_numero" as={Col} lg={3}>
            <Form.Label>Número</Form.Label>
            <Form.Control
              plaintext
              readOnly
              value={props.data.endereco_numero}
            />
          </Form.Group>
          <Form.Group controlId="complemento" as={Col} lg={9}>
            <Form.Label>Complemento</Form.Label>
            <Form.Control plaintext readOnly value={props.data.complemento} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId="estado_civil" as={Col} lg={4}>
            <Form.Label>Estado Civil</Form.Label>
            <Form.Control plaintext readOnly value={props.data.estado_civil} />
          </Form.Group>
          <Form.Group controlId="ocupacao" as={Col} lg={4}>
            <Form.Label>Ocupação</Form.Label>
            <Form.Control plaintext readOnly value={props.data.ocupacao} />
          </Form.Group>
          <Form.Group controlId="data_vencimento" as={Col} lg={4}>
            <Form.Label>Data de Vencimento</Form.Label>
            <Form.Control
              plaintext
              readOnly
              value={props.data.data_vencimento}
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId="nome_mae" as={Col}>
            <Form.Label>Nome da Mãe</Form.Label>
            <Form.Control plaintext readOnly value={props.data.nome_mae} />
          </Form.Group>
        </Form.Row>
      </Card.Body>
    </Card>
  );
};

export default CartaoDeCredito;

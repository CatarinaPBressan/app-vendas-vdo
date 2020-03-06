import React from "react";
import { Card, Form } from "react-bootstrap";

const CartaoDeCredito = (props) => {
  return (
    <Card>
      <Card.Header>Cartão de Crédito</Card.Header>
      <Card.Body>
        <Form.Group controlId="cep">
          <Form.Label>CEP</Form.Label>
          <Form.Control plaintext readOnly value={props.data.cep} />
        </Form.Group>
        <Form.Group controlId="uf">
          <Form.Label>UF</Form.Label>
          <Form.Control plaintext readOnly value={props.data.uf} />
        </Form.Group>
        <Form.Group controlId="cidade">
          <Form.Label>Cidade</Form.Label>
          <Form.Control plaintext readOnly value={props.data.cidade} />
        </Form.Group>
        <Form.Group controlId="logradouro">
          <Form.Label>Logradouro / Rua</Form.Label>
          <Form.Control plaintext readOnly value={props.data.logradouro} />
        </Form.Group>
        <Form.Group controlId="endereco_numero">
          <Form.Label>Número</Form.Label>
          <Form.Control plaintext readOnly value={props.data.endereco_numero} />
        </Form.Group>
        <Form.Group controlId="complemento">
          <Form.Label>Complemento</Form.Label>
          <Form.Control plaintext readOnly value={props.data.complemento} />
        </Form.Group>
        <Form.Group controlId="estado_civil">
          <Form.Label>Estado Civil</Form.Label>
          <Form.Control plaintext readOnly value={props.data.estado_civil} />
        </Form.Group>
        <Form.Group controlId="ocupacao">
          <Form.Label>Ocupação</Form.Label>
          <Form.Control plaintext readOnly value={props.data.ocupacao} />
        </Form.Group>
        <Form.Group controlId="nome_mae">
          <Form.Label>Nome da Mãe</Form.Label>
          <Form.Control plaintext readOnly value={props.data.nome_mae} />
        </Form.Group>
        <Form.Group controlId="data_vencimento">
          <Form.Label>Data de Vencimento</Form.Label>
          <Form.Control plaintext readOnly value={props.data.data_vencimento} />
        </Form.Group>
      </Card.Body>
    </Card>
  );
};

export default CartaoDeCredito;

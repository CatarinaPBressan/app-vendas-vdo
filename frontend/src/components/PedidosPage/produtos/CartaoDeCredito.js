import React from "react";
import { Card, Form, Col } from "react-bootstrap";

const CartaoDeCredito = ({ data }) => {
  return (
    <Card>
      <Card.Header>Cartão de Crédito</Card.Header>
      <Card.Body>
        <Form.Row>
          <Form.Group controlId="cep" as={Col} lg={4}>
            <Form.Label>CEP</Form.Label>
            <Form.Control plaintext readOnly value={data.cep} />
          </Form.Group>
          <Form.Group controlId="uf" as={Col} lg={4}>
            <Form.Label>UF</Form.Label>
            <Form.Control plaintext readOnly value={data.uf} />
          </Form.Group>
          <Form.Group controlId="cidade" as={Col} lg={4}>
            <Form.Label>Cidade</Form.Label>
            <Form.Control plaintext readOnly value={data.cidade} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId="logradouro" as={Col}>
            <Form.Label>Logradouro</Form.Label>
            <Form.Control plaintext readOnly value={data.logradouro} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId="endereco_numero" as={Col} lg={3}>
            <Form.Label>Número</Form.Label>
            <Form.Control plaintext readOnly value={data.endereco_numero} />
          </Form.Group>
          <Form.Group controlId="complemento" as={Col} lg={9}>
            <Form.Label>Complemento</Form.Label>
            <Form.Control plaintext readOnly value={data.complemento} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId="estado_civil" as={Col} lg={6}>
            <Form.Label>Estado Civil</Form.Label>
            <Form.Control
              plaintext
              readOnly
              value={
                {
                  solteiro: "Solteiro",
                  casado: "Casado(a) ou União Estável",
                  viuvo: "Viúvo(a)",
                  separado: "Separado(a) ou Divorciado(a)",
                }[data.estado_civil]
              }
            />
          </Form.Group>
          <Form.Group controlId="data_nascimento" as={Col} lg={6}>
            <Form.Label>Data Nascimento</Form.Label>
            <Form.Control plaintext readOnly value={data.data_nascimento} />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId="ocupacao" as={Col} lg={6}>
            <Form.Label>Ocupação</Form.Label>
            <Form.Control
              plaintext
              readOnly
              value={
                {
                  assalariado: "Assalariado",
                  empresario: "Empresario",
                  aposentado: "Aposentado ou Pensionista",
                  autonomo: "Autônomo",
                  outros: "Outros",
                }[data.ocupacao]
              }
            />
          </Form.Group>
          <Form.Group controlId="data_vencimento" as={Col} lg={6}>
            <Form.Label>Data de Vencimento</Form.Label>
            <Form.Control
              plaintext
              readOnly
              value={
                {
                  dia_5: "5",
                  dia_10: "10",
                  dia_15: "15",
                  dia_20: "20",
                  dia_25: "25",
                }[data.data_vencimento]
              }
            />
          </Form.Group>
        </Form.Row>
        <Form.Row>
          <Form.Group controlId="nome_mae" as={Col}>
            <Form.Label>Nome da Mãe</Form.Label>
            <Form.Control plaintext readOnly value={data.nome_mae} />
          </Form.Group>
        </Form.Row>
      </Card.Body>
    </Card>
  );
};

export default CartaoDeCredito;

import React from "react";

import { Form, Card } from "react-bootstrap";
import InputMask from "react-input-mask";

import { FIELDS, UFS_BRASIL } from "../../../constants/fields";

const CartaoDeCredito = () => {
  return (
    <>
      <Card>
        <Card.Header>Cartão de Crédito - Endereço</Card.Header>
        <Card.Body>
          <Form.Group controlId="cep">
            <Form.Label>CEP</Form.Label>
            <InputMask mask={FIELDS.cep.mask}>
              {() => (
                <Form.Control
                  type="text"
                  placeholder={FIELDS.cep.placeholder}
                  pattern={FIELDS.cep.pattern}
                  inputMode="numeric"
                  name="cep"
                  required
                />
              )}
            </InputMask>
            <Form.Text className="text-muted">Somente números</Form.Text>
          </Form.Group>
          <Form.Group controlId="uf">
            <Form.Label>UF</Form.Label>
            <Form.Control as="select" name="uf" required>
              <option value="">(Selecione)</option>
              {UFS_BRASIL.map((uf) => (
                <option value={uf} key={uf}>
                  {uf}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="cidade">
            <Form.Label>Cidade</Form.Label>
            <Form.Control type="text" name="cidade" required />
          </Form.Group>
          <Form.Group controlId="logradouro">
            <Form.Label>Logradouro</Form.Label>
            <Form.Control type="text" name="logradouro" required />
          </Form.Group>
          <Form.Group controlId="endereco_numero">
            <Form.Label>Número</Form.Label>
            <Form.Control type="text" name="endereco_numero" required />
          </Form.Group>
          <Form.Group controlId="complemento">
            <Form.Label>Complemento</Form.Label>
            <Form.Control type="text" name="complemento" />
          </Form.Group>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>Cartão de Crédito - Dados Adicionais</Card.Header>
        <Card.Body>
          <Form.Group controlId="estado_civil">
            <Form.Label>Estado Civil</Form.Label>
            <Form.Control as="select" name="estado_civil" required>
              <option value="">(Selecione)</option>
              <option value="solteiro">Solteiro(a)</option>
              <option value="casado">Casado(a) ou União Estável</option>
              <option value="viuvo">Viúvo(a)</option>
              <option value="separado">Separado(a) ou Divorciado(a)</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="ocupacao">
            <Form.Label>Ocupação</Form.Label>
            <Form.Control as="select" name="ocupacao" required>
              <option value="">(Selecione)</option>
              <option value="assalariado">Assalariado</option>
              <option value="empresario">Empresario</option>
              <option value="aposentado">Aposentado ou Pensionista</option>
              <option value="autonomo">Autônomo</option>
              <option value="outros">Outros</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="data_nascimento">
            <Form.Label>Data Nascimento</Form.Label>
            <InputMask mask={FIELDS.data.mask}>
              {() => (
                <Form.Control
                  type="text"
                  placeholder={FIELDS.data.placeholder}
                  pattern={FIELDS.data.pattern}
                  inputMode="numeric"
                  name="data_nascimento"
                  required
                />
              )}
            </InputMask>
          </Form.Group>
          <Form.Group controlId="data_vencimento">
            <Form.Label>Data de Vencimento</Form.Label>
            <Form.Control as="select" name="data_vencimento" required>
              <option value="">(Selecione)</option>
              <option value="dia_5">5</option>
              <option value="dia_10">10</option>
              <option value="dia_15">15</option>
              <option value="dia_20">20</option>
              <option value="dia_25">25</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="nome_mae">
            <Form.Label>Nome da Mãe</Form.Label>
            <Form.Control type="text" name="nome_mae" required />
          </Form.Group>
        </Card.Body>
      </Card>
    </>
  );
};

export default CartaoDeCredito;

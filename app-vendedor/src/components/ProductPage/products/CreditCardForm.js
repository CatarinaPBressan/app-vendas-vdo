import React, { Component } from 'react';

import { Form, Card } from 'react-bootstrap';
import InputMask from 'react-input-mask';

import { FIELDS, BRAZIL_STATES } from '../../../constants/fields';

class CreditCardForm extends Component {
  render() {
    return (
      <Card>
        <Card.Header>Cartão de Crédito</Card.Header>
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
                  required={true}
                />
              )}
            </InputMask>
            <Form.Text className="text-muted">Somente números</Form.Text>
          </Form.Group>
          <Form.Group controlId="estado">
            <Form.Label>UF</Form.Label>
            <Form.Control as="select" name="estado" required={true}>
              <option value="">(Selecione)</option>
              {BRAZIL_STATES.map((state) => (
                <option value={state} key={state}>
                  {state}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="cidade">
            <Form.Label>Cidade</Form.Label>
            <Form.Control type="text" name="cidade" required={true} />
          </Form.Group>
          <Form.Group controlId="logradouro">
            <Form.Label>Logradouro / Rua</Form.Label>
            <Form.Control type="text" name="logradouro" required={true} />
          </Form.Group>
          <Form.Group controlId="endereco_numero">
            <Form.Label>Número</Form.Label>
            <Form.Control type="text" name="endereco_numero" required={true} />
          </Form.Group>
          <Form.Group controlId="complemento">
            <Form.Label>Complemento</Form.Label>
            <Form.Control type="text" name="complemento" />
          </Form.Group>
          <Form.Group controlId="estado_civil">
            <Form.Label>Estado Civil</Form.Label>
            <Form.Control as="select" name="estado_civil" required={true}>
              <option value="">(Selecione)</option>
              <option value="solteiro">Solteiro(a)</option>
              <option value="casado">Casado(a) ou União Estável</option>
              <option value="viuvo">Viúvo(a)</option>
              <option value="separado">Separado(a) ou Divorciado(a)</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="ocupacao">
            <Form.Label>Ocupação</Form.Label>
            <Form.Control as="select" name="ocupacao" required={true}>
              <option value="">(Selecione)</option>
              <option value="assalariado">Assalariado</option>
              <option value="empresario">Empresario</option>
              <option value="aposentado">Aposentado ou Pensionista</option>
              <option value="autonomo">Autônomo</option>
              <option value="outros">Outros</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="nome_mae">
            <Form.Label>Nome da Mãe</Form.Label>
            <Form.Control type="text" name="nome_mae" required={true} />
          </Form.Group>
          <Form.Group controlId="data_vencimento">
            <Form.Label>Data de Vencimento</Form.Label>
            <Form.Control as="select" name="data_vencimento" required={true}>
              <option value="">(Selecione)</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
            </Form.Control>
          </Form.Group>
        </Card.Body>
      </Card>
    );
  }
}
export default CreditCardForm;

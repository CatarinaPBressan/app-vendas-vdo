import React from "react";

import { Form, Card, InputGroup } from "react-bootstrap";
import InputMask from "react-input-mask";

import { FIELDS, UFS_BRASIL } from "../../../constants/fields";

export const Consorcio = () => {
  return (
    <>
      <Card>
        <Card.Header>Consórcio - Produto</Card.Header>
        <Card.Body>
          <Form.Group controlId="produto">
            <Form.Label>Tipo do Produto</Form.Label>
            <Form.Control as="select" name="produto" required>
              <option value="">(Selecione)</option>
              <option value="imovel">Imóvel</option>
              <option value="automovel">Auotomóvel</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="uf_produto">
            <Form.Label>UF</Form.Label>
            <Form.Control as="select" name="uf_produto" required>
              <option value="">(Selecione)</option>
              {UFS_BRASIL.map((uf) => (
                <option value={uf} key={uf}>
                  {uf}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="valor_credito">
            <Form.Label>Valor do Crédito</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>R$</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control type="text" name="valor_credito" required />
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="valor_parcela">
            <Form.Label>Valor da Parcela</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>R$</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control type="text" name="valor_parcela" required />
            </InputGroup>
          </Form.Group>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>Consórcio - Dados Adicionais do Cliente</Card.Header>
        <Card.Body>
          <Form.Group controlId="telefone_residencial">
            <Form.Label>Telefone Resindencial</Form.Label>
            <InputMask mask={FIELDS.telefone_residencial.mask}>
              {() => (
                <Form.Control
                  name="telefone_residencial"
                  type="text"
                  placeholder={FIELDS.telefone_residencial.placeholder}
                  inputMode="numeric"
                  pattern={FIELDS.telefone_residencial.pattern}
                />
              )}
            </InputMask>
            <Form.Text className="text-muted">Somente números</Form.Text>
          </Form.Group>
          <Form.Group controlId="estado_civil">
            <Form.Label>Estado Civil</Form.Label>
            <Form.Control as="select" name="estado_civil" required>
              <option value="">(Selecione)</option>
              <option value="solteiro">Solteiro(a)</option>
              <option value="casado">Casado(a) ou União Estável</option>
              <option value="viuvo">Viúvo(a)</option>
              <option value="separado_judicialmente">
                Separado(a) Judicialmente
              </option>
              <option value="separado">Separado(a)</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="exposta_politicamente">
            <Form.Label>Pessoa exposta politicamente?</Form.Label>
            <Form.Control as="select" name="exposta_politicamente" required>
              <option value="">(Selecione)</option>
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="profissao">
            <Form.Label>Profissão</Form.Label>
            <Form.Control type="text" name="profissao" required />
          </Form.Group>
          <Form.Group controlId="renda_mensal">
            <Form.Label>Renda Mensal</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>R$</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control type="text" name="renda_mensal" required />
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="rg">
            <Form.Label>RG</Form.Label>
            <Form.Control type="text" name="rg" required />
          </Form.Group>
          <Form.Group controlId="rg_expedidor">
            <Form.Label>Órgão Expedidor</Form.Label>
            <Form.Control type="text" name="rg_expedidor" required />
          </Form.Group>
          <Form.Group controlId="rg_data_expedicao">
            <Form.Label>Data Expedição</Form.Label>
            <InputMask mask={FIELDS.data.mask}>
              {() => (
                <Form.Control
                  type="text"
                  placeholder={FIELDS.data.placeholder}
                  pattern={FIELDS.data.pattern}
                  inputMode="numeric"
                  name="rg_data_expedicao"
                  required
                />
              )}
            </InputMask>
          </Form.Group>
          <Form.Group controlId="nome_mae">
            <Form.Label>Nome da Mãe</Form.Label>
            <Form.Control type="text" name="nome_mae" required />
          </Form.Group>
          <Form.Group controlId="nacionalidade">
            <Form.Label>Nacionalidade</Form.Label>
            <Form.Control
              type="text"
              name="nacionalidade"
              required
              defaultValue="Brasileiro(a)"
            />
          </Form.Group>
          <Form.Group controlId="cidade_nascimento">
            <Form.Label>Cidade de Nascimento</Form.Label>
            <Form.Control type="text" name="cidade_nascimento" required />
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
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>Consorcio - Endereço Residencial</Card.Header>
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
            <Form.Text className="text_muted">Somente números</Form.Text>
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
    </>
  );
};

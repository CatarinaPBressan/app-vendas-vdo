import React, { useState } from "react";

import { Form, Card, InputGroup } from "react-bootstrap";
import InputMask from "react-input-mask";

import { FIELDS, UFS_BRASIL } from "../../../constants/fields";

const SeguroVida = () => {
  const [selectedRegime, setSelectedRegime] = useState("");

  const onRegimeChange = (e) => {
    setSelectedRegime(e.target.value);
  };

  const [inserirConjugue, setInserirConjugue] = useState(false);
  const onInserirConjugueChange = (e) => {
    setInserirConjugue(e.target.value === "sim");
  };

  // REF: https://github.com/sanniassin/react-input-mask/issues/158
  const maskedConjugeInputProps = { disabled: !inserirConjugue };

  const [possuiEnderecoComercial, setPossuiEnderecoComercial] = useState(false);
  const onPossuiEnderecoComercialChange = (e) => {
    setPossuiEnderecoComercial(e.target.value === "sim");
  };

  // REF: https://github.com/sanniassin/react-input-mask/issues/158
  const maskedpossuiEnderecoComercialInputProps = {
    disabled: !possuiEnderecoComercial,
  };

  return (
    <>
      <Card>
        <Card.Header>Seguro de Vida Individual - Dados do Segurado</Card.Header>
        <Card.Body>
          <Form.Group controlId="genero">
            <Form.Label>Genero</Form.Label>
            <Form.Control as="select" name="genero" required>
              <option value="">(Selecione)</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
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
          <Form.Group controlId="fumante">
            <Form.Label>Fumante</Form.Label>
            <Form.Control as="select" name="fumante" required>
              <option value="">(Selecione)</option>
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </Form.Control>
          </Form.Group>
          <hr />
          <Form.Group>
            <Form.Label>Regime de Trabalho</Form.Label>
            <Form.Check
              type="radio"
              id="regime_de_trabalho_clt"
              name="regime_de_trabalho"
              value="clt"
              label="CLT"
              required
              onChange={onRegimeChange}
            />
            <Form.Group controlId="nome_empresa_clt">
              <Form.Label>Nome da Empresa</Form.Label>
              <Form.Control
                type="text"
                name="nome_empresa_clt"
                required={selectedRegime === "clt"}
                disabled={selectedRegime !== "clt"}
              />
            </Form.Group>
            <Form.Check
              type="radio"
              id="regime_de_trabalho_pl"
              name="regime_de_trabalho"
              value="profissional_liberal"
              label="Profissional Liberal"
              required
              onChange={onRegimeChange}
            />
            <Form.Group controlId="ramo_empresa_pl">
              <Form.Label>Ramo da Empresa</Form.Label>
              <Form.Control
                type="text"
                name="ramo_empresa_pl"
                required={selectedRegime === "profissional_liberal"}
                disabled={selectedRegime !== "profissional_liberal"}
              />
            </Form.Group>
          </Form.Group>
          <Form.Group controlId="profissao">
            <Form.Label>Profissão</Form.Label>
            <Form.Control type="text" name="profissao" required />
          </Form.Group>
          <Form.Group controlId="renda">
            <Form.Label>Renda</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>R$</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control type="text" name="renda" required />
            </InputGroup>
          </Form.Group>
          <hr />
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
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>Seguro de Vida Individual - Dados do Cônjugue</Card.Header>
        <Card.Body>
          <Form.Group>
            <Form.Label>Deseja inserir cônjugue como dependente?</Form.Label>
            <Form.Check
              type="radio"
              id="inserir_conjugue_nao"
              name="inserir_conjugue"
              value="nao"
              label="Não"
              defaultChecked
              onChange={onInserirConjugueChange}
            />
            <Form.Check
              type="radio"
              id="inserir_conjugue_sim"
              name="inserir_conjugue"
              value="sim"
              label="Sim"
              onChange={onInserirConjugueChange}
            />
          </Form.Group>
          <Form.Group controlId="cpf_conjugue">
            <Form.Label>CPF</Form.Label>
            <InputMask mask={FIELDS.cpf.mask} disabled={!inserirConjugue}>
              {() => (
                <Form.Control
                  name="cpf_conjugue"
                  type="text"
                  placeholder={FIELDS.cpf.placeholder}
                  inputMode="numeric"
                  pattern={FIELDS.cpf.pattern}
                  required={inserirConjugue}
                  {...maskedConjugeInputProps}
                />
              )}
            </InputMask>
            <Form.Text className="text_muted">Somente números</Form.Text>
          </Form.Group>
          <Form.Group controlId="genero_conjugue">
            <Form.Label>Genero</Form.Label>
            <Form.Control
              as="select"
              name="genero_conjugue"
              required={inserirConjugue}
              disabled={!inserirConjugue}
            >
              <option value="">(Selecione)</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="data_nascimento_conjugue">
            <Form.Label>Data Nascimento</Form.Label>
            <InputMask mask={FIELDS.data.mask} disabled={!inserirConjugue}>
              {() => (
                <Form.Control
                  type="text"
                  placeholder={FIELDS.data.placeholder}
                  pattern={FIELDS.data.pattern}
                  inputMode="numeric"
                  name="data_nascimento_conjugue"
                  required={inserirConjugue}
                  {...maskedConjugeInputProps}
                />
              )}
            </InputMask>
          </Form.Group>
          <Form.Group controlId="rg_conjugue">
            <Form.Label>RG</Form.Label>
            <Form.Control
              type="text"
              name="rg_conjugue"
              required={inserirConjugue}
              disabled={!inserirConjugue}
            />
          </Form.Group>
          <Form.Group controlId="rg_expedidor_conjugue">
            <Form.Label>Órgão Expedidor</Form.Label>
            <Form.Control
              type="text"
              name="rg_expedidor_conjugue"
              required={inserirConjugue}
              disabled={!inserirConjugue}
            />
          </Form.Group>
          <Form.Group controlId="rg_data_expedicao_conjugue">
            <Form.Label>Data Expedição</Form.Label>
            <InputMask mask={FIELDS.data.mask} disabled={!inserirConjugue}>
              {() => (
                <Form.Control
                  type="text"
                  placeholder={FIELDS.data.placeholder}
                  pattern={FIELDS.data.pattern}
                  inputMode="numeric"
                  name="rg_data_expedicao_conjugue"
                  required={inserirConjugue}
                  {...maskedConjugeInputProps}
                />
              )}
            </InputMask>
          </Form.Group>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>
          Seguro de Vida Individual - Endereço Residencial
        </Card.Header>
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
      <Card>
        <Card.Header>
          Seguro de Vida Individual - Endereço Comercial
        </Card.Header>
        <Card.Body>
          <Form.Group>
            <Form.Label>Possui endereço comercial?</Form.Label>
            <Form.Check
              type="radio"
              id="possui_endereco_comercial_nao"
              name="possui_endereco_comercial"
              value="nao"
              label="Não"
              onChange={onPossuiEnderecoComercialChange}
              defaultChecked
            />
            <Form.Check
              type="radio"
              id="possui_endereco_comercial_sim"
              name="possui_endereco_comercial"
              value="sim"
              label="Sim"
              onChange={onPossuiEnderecoComercialChange}
            />
          </Form.Group>
          <Form.Group controlId="cep_comercial">
            <Form.Label>CEP</Form.Label>
            <InputMask
              mask={FIELDS.cep.mask}
              {...maskedpossuiEnderecoComercialInputProps}
            >
              {() => (
                <Form.Control
                  type="text"
                  placeholder={FIELDS.cep.placeholder}
                  pattern={FIELDS.cep.pattern}
                  inputMode="numeric"
                  name="cep_comercial"
                  required={possuiEnderecoComercial}
                  {...maskedpossuiEnderecoComercialInputProps}
                />
              )}
            </InputMask>
            <Form.Text className="text_muted">Somente números</Form.Text>
          </Form.Group>
          <Form.Group controlId="uf_comercial">
            <Form.Label>UF</Form.Label>
            <Form.Control
              as="select"
              name="uf_comercial"
              required={possuiEnderecoComercial}
              disabled={!possuiEnderecoComercial}
            >
              <option value="">(Selecione)</option>
              {UFS_BRASIL.map((uf) => (
                <option value={uf} key={uf}>
                  {uf}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="cidade_comercial">
            <Form.Label>Cidade</Form.Label>
            <Form.Control
              type="text"
              name="cidade_comercial"
              required={possuiEnderecoComercial}
              disabled={!possuiEnderecoComercial}
            />
          </Form.Group>
          <Form.Group controlId="logradouro_comercial">
            <Form.Label>Logradouro</Form.Label>
            <Form.Control
              type="text"
              name="logradouro_comercial"
              required={possuiEnderecoComercial}
              disabled={!possuiEnderecoComercial}
            />
          </Form.Group>
          <Form.Group controlId="endereco_numero_comercial">
            <Form.Label>Número</Form.Label>
            <Form.Control
              type="text"
              name="endereco_numero_comercial"
              required={possuiEnderecoComercial}
              disabled={!possuiEnderecoComercial}
            />
          </Form.Group>
          <Form.Group controlId="complemento_comercial">
            <Form.Label>Complemento</Form.Label>
            <Form.Control
              type="text"
              name="complemento_comercial"
              required={possuiEnderecoComercial}
              disabled={!possuiEnderecoComercial}
            />
          </Form.Group>
        </Card.Body>
      </Card>
    </>
  );
};

export default SeguroVida;

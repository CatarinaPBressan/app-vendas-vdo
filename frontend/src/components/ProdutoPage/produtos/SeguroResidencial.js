import React, { useState } from "react";

import { Form, Card, InputGroup } from "react-bootstrap";
import InputMask from "react-input-mask";

import { FIELDS, UFS_BRASIL } from "../../../constants/fields";
import { getFileNameFromPath } from "../../../utils/utils";

const SeguroResidencial = () => {
  const [isRenovacao, setIsRenovacao] = useState(false);
  const onIsRenovacaoChange = (e) => {
    setIsRenovacao(e.target.value === "renovacao");
  };

  const [apoliceAtualLabel, setApoliceAtualLabel] = useState("Apólice Atual");
  const onApoliceFileChange = (e) => {
    setApoliceAtualLabel(getFileNameFromPath(e.target.value));
  };

  return (
    <>
      <Card>
        <Card.Header>Apólice</Card.Header>
        <Card.Body>
          <Form.Group>
            <Form.Label>Novo ou Renovação</Form.Label>
            <Form.Check
              type="radio"
              id="novo_ou_renovacao_novo"
              name="novo_ou_renovacao"
              value="novo"
              label="Novo"
              defaultChecked
              onChange={onIsRenovacaoChange}
            />
            <Form.Check
              type="radio"
              id="novo_ou_renovacao_renovacao"
              name="novo_ou_renovacao"
              value="renovacao"
              label="Renovação"
              onChange={onIsRenovacaoChange}
            />
          </Form.Group>
          <Form.Group controlId="apolice_atual">
            <Form.Label>Apólice atual</Form.Label>
            <Form.File
              name="apolice_atual"
              required={isRenovacao}
              disabled={!isRenovacao}
              custom
              onChange={onApoliceFileChange}
              label={apoliceAtualLabel}
            />
            <Form.Text className="text-muted">
              Obrigatório se renovação
            </Form.Text>
          </Form.Group>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>Dados Adicionais do Segurado</Card.Header>
        <Card.Body>
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
          <hr />
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
          <Form.Group controlId="valor_em_risco">
            <Form.Label>Valor em risco</Form.Label>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>R$</InputGroup.Text>
              </InputGroup.Prepend>
              <Form.Control type="text" name="valor_em_risco" required />
            </InputGroup>
          </Form.Group>
          <Form.Group controlId="exposta_politicamente">
            <Form.Label>Pessoa exposta politicamente?</Form.Label>
            <Form.Control as="select" name="exposta_politicamente" required>
              <option value="">(Selecione)</option>
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </Form.Control>
          </Form.Group>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>Endereço da Residência</Card.Header>
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
        <Card.Header>Dados da Residencia</Card.Header>
        <Card.Body>
          <Form.Group controlId="atividade_profissional">
            <Form.Label>Atividade Profissional no local?</Form.Label>
            <Form.Control
              as="select"
              name="atividade_profissional_no_local"
              required
            >
              <option value="">(Selecione)</option>
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="construcao">
            <Form.Label>Construção</Form.Label>
            <Form.Control as="select" name="construcao" required>
              <option value="">(Selecione)</option>
              <option value="alvenaria">Alvenaria</option>
              <option value="madeira">Madeira</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="objeto_segurado">
            <Form.Label>Objeto Segurado</Form.Label>
            <Form.Control as="select" name="objeto_segurado" required>
              <option value="">(Selecione)</option>
              <option value="predio">Prédio</option>
              <option value="conteudo">Conteúdo</option>
              <option value="predio_conteudo">Prédio e conteúdo</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="tipo">
            <Form.Label>Tipo</Form.Label>
            <Form.Control as="select" name="tipo" required>
              <option value="">(Selecione)</option>
              <option value="casa">Casa</option>
              <option value="casa_condominio_fechado">
                Casa em condomínio fechado
              </option>
              <option value="apartamento">Apartamento</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="uso">
            <Form.Label>Uso</Form.Label>
            <Form.Control as="select" name="uso" required>
              <option value="">(Selecione)</option>
              <option value="habitual">Habitual</option>
              <option value="veraneio">Veraneio</option>
              <option value="desocupado">Desocupado</option>
            </Form.Control>
          </Form.Group>
        </Card.Body>
      </Card>
    </>
  );
};

export default SeguroResidencial;

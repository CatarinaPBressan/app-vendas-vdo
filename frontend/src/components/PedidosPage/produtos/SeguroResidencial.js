import React from "react";

import { Form, Card, Col } from "react-bootstrap";

import { FileDownloadButton } from "../FileDownloadButton";

const SeguroResidencial = ({ data, usuario }) => {
  return (
    <>
      <Card>
        <Card.Header>Apólice</Card.Header>
        <Card.Body>
          <Form.Row>
            <Form.Group controlId="novo_ou_renovacao" as={Col}>
              <Form.Label>Novo ou Renovação</Form.Label>
              <Form.Check
                type="radio"
                label="Novo"
                defaultChecked={data.novo_ou_renovacao === "novo"}
                disabled
              />
              <Form.Check
                type="radio"
                label="Renovação"
                defaultChecked={data.novo_ou_renovacao === "renovacao"}
                disabled
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="apolice_atual" as={Col}>
              <Form.Label>Apólice atual</Form.Label>
              <br />
              <FileDownloadButton
                usuario={usuario}
                fileData={data.apolice_atual}
              />
            </Form.Group>
          </Form.Row>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>Dados Adicionais do Segurado</Card.Header>
        <Card.Body>
          <Form.Row>
            <Form.Group controlId="rg" as={Col} lg={4}>
              <Form.Label>RG</Form.Label>
              <Form.Control readOnly plaintext value={data.rg} />
            </Form.Group>
            <Form.Group controlId="rg_expedidor" as={Col} lg={4}>
              <Form.Label>Órgão Expedidor</Form.Label>
              <Form.Control readOnly plaintext value={data.rg_expedidor} />
            </Form.Group>
            <Form.Group controlId="rg_data_expedicao" as={Col} lg={4}>
              <Form.Label>Data Expedição</Form.Label>
              <Form.Control readOnly plaintext value={data.rg_data_expedicao} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="estado_civil" as={Col} lg={2}>
              <Form.Label>Estado Civil</Form.Label>
              <Form.Control readOnly plaintext value={data.estado_civil} />
            </Form.Group>
            <Form.Group controlId="profissao" as={Col} lg={4}>
              <Form.Label>Profissão</Form.Label>
              <Form.Control readOnly plaintext value={data.profissao} />
            </Form.Group>
            <Form.Group controlId="renda_mensal" as={Col} lg={3}>
              <Form.Label>Renda (R$)</Form.Label>
              <Form.Control readOnly plaintext value={data.renda_mensal} />
            </Form.Group>
            <Form.Group controlId="valor_em_risco" as={Col} lg={3}>
              <Form.Label>Valor em risco (R$)</Form.Label>
              <Form.Control readOnly plaintext value={data.valor_em_risco} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="exposta_politicamente" as={Col} lg={12}>
              <Form.Label>Pessoa exposta politicamente?</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={data.exposta_politicamente === "sim" ? "Sim" : "Não"}
              />
            </Form.Group>
          </Form.Row>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>Endereço da Residência</Card.Header>
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
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>Dados da Residencia</Card.Header>
        <Card.Body>
          <Form.Row>
            <Form.Group controlId="atividade_profissional" as={Col} lg={6}>
              <Form.Label>Atividade Profissional no local?</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={data.atividade_profissional === "sim" ? "Sim" : "Não"}
              />
            </Form.Group>
            <Form.Group controlId="construcao" as={Col} lg={6}>
              <Form.Label>Construção</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={
                  { alvenaria: "Alvenaria", madeira: "Madeira" }[
                    data.construcao
                  ]
                }
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="objeto_segurado" as={Col} lg={4}>
              <Form.Label>Objeto Segurado</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={
                  {
                    predio: "Prédio",
                    conteudo: "Conteúdo",
                    predio_conteudo: "Prédio e Conteúdo",
                  }[data.objeto_segurado]
                }
              />
            </Form.Group>

            <Form.Group controlId="tipo" as={Col} lg={4}>
              <Form.Label>Tipo</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={
                  {
                    casa: "Casa",
                    casa_condominio_fechado: "Casa em condomínio fechado",
                    apartamento: "Apartamento",
                  }[data.tipo]
                }
              />
            </Form.Group>
            <Form.Group controlId="uso" as={Col} lg={4}>
              <Form.Label>Uso</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={
                  {
                    habitual: "Habitual",
                    veraneio: "Veraneio",
                    desocupado: "Desocupado",
                  }[data.uso]
                }
              />
            </Form.Group>
          </Form.Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default SeguroResidencial;

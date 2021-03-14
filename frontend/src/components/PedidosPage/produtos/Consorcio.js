import React from "react";

import { Form, Card, Col } from "react-bootstrap";

export const Consorcio = ({ data }) => {
  return (
    <>
      <Card>
        <Card.Header>Consórcio - Produto</Card.Header>
        <Card.Body>
          <Form.Row>
            <Form.Group controlId="produto" as={Col}>
              <Form.Label>Tipo do Produto</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={
                  { imovel: "Imóvel", automovel: "Automóvel" }[data.produto]
                }
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="uf_produto" as={Col} lg={4}>
              <Form.Label>UF</Form.Label>
              <Form.Control plaintext readOnly value={data.uf_produto} />
            </Form.Group>
            <Form.Group controlId="valor_credito" as={Col} lg={4}>
              <Form.Label>Valor do Crédito (R$)</Form.Label>
              <Form.Control plaintext readOnly value={data.valor_credito} />
            </Form.Group>
            <Form.Group controlId="valor_parcela" as={Col} lg={4}>
              <Form.Label>Valor da Parcela (R$)</Form.Label>
              <Form.Control plaintext readOnly value={data.valor_parcela} />
            </Form.Group>
          </Form.Row>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>Consórcio - Dados Adicionais do Cliente</Card.Header>
        <Card.Body>
          <Form.Row>
            <Form.Group controlId="telefone_residencial" as={Col} lg={4}>
              <Form.Label>Telefone Residencial</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={data.telefone_residencial}
              />
            </Form.Group>
            <Form.Group controlId="estado_civil" as={Col} lg={4}>
              <Form.Label>Estado Civil</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={
                  {
                    solteiro: "Solteiro",
                    casado: "Casado(a) ou União Estável",
                    viuvo: "Viúvo(a)",
                    separado_judicialmente: "Separado(a) Judicialmente",
                    separado: "Separado(a)",
                  }[data.estado_civil]
                }
              />
            </Form.Group>
            <Form.Group controlId="exposta_politicamente" as={Col} lg={4}>
              <Form.Label>Pessoa exposta politicamente?</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={data.exposta_politicamente === "sim" ? "Sim" : "Não"}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="profissao" as={Col} lg={6}>
              <Form.Label>Profissão</Form.Label>
              <Form.Control readOnly plaintext value={data.profissao} />
            </Form.Group>
            <Form.Group controlId="renda_mensal" as={Col} lg={6}>
              <Form.Label>Renda Mensal (R$)</Form.Label>
              <Form.Control readOnly plaintext value={data.renda_mensal} />
            </Form.Group>
          </Form.Row>
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
            <Form.Group controlId="nacionalidade" as={Col} lg={6}>
              <Form.Label>Nacionalidade</Form.Label>
              <Form.Control readOnly plaintext value={data.nacionalidade} />
            </Form.Group>
            <Form.Group controlId="data_nascimento" as={Col} lg={6}>
              <Form.Label>Data Nascimento</Form.Label>
              <Form.Control plaintext readOnly value={data.data_nascimento} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="cidade_nascimento" as={Col} lg={12}>
              <Form.Label>Cidade de Nascimento</Form.Label>
              <Form.Control readOnly plaintext value={data.cidade_nascimento} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="nome_mae" as={Col} lg={12}>
              <Form.Label>Nome da Mãe</Form.Label>
              <Form.Control readOnly plaintext value={data.nome_mae} />
            </Form.Group>
          </Form.Row>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>Consorcio - Endereço Residencial</Card.Header>
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
    </>
  );
};

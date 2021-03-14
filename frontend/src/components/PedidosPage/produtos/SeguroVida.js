import React from "react";
import { Card, Form, Col } from "react-bootstrap";

const SeguroVida = ({ data }) => {
  return (
    <>
      <Card>
        <Card.Header>Seguro de Vida Individual - Dados do Segurado</Card.Header>
        <Card.Body>
          <Form.Row>
            <Form.Group controlId="genero" as={Col} lg={4}>
              <Form.Label>Genero</Form.Label>
              <Form.Control plaintext readOnly value={data.genero} />
            </Form.Group>
            <Form.Group controlId="data_nascimento" as={Col} lg={4}>
              <Form.Label>Data Nascimento</Form.Label>
              <Form.Control readOnly plaintext value={data.data_nascimento} />
            </Form.Group>
            <Form.Group controlId="estado_civil" as={Col} lg={2}>
              <Form.Label>Estado Civil</Form.Label>
              <Form.Control readOnly plaintext value={data.estado_civil} />
            </Form.Group>
            <Form.Group controlId="fumante" as={Col} lg={2}>
              <Form.Label>Fumante</Form.Label>
              <Form.Control readOnly plaintext value={data.fumante} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="regime_de_trabalho" as={Col} lg={12}>
              <Form.Label>Regime de Trabalho</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={data.regime_de_trabalho}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="nome_empresa_clt" as={Col} lg={6}>
              <Form.Label>Nome da Empresa (CLT)</Form.Label>
              <Form.Control readOnly plaintext value={data.nome_empresa_clt} />
            </Form.Group>
            <Form.Group controlId="ramo_empresa_pl" as={Col} lg={6}>
              <Form.Label>Ramo da Empresa (PL)</Form.Label>
              <Form.Control readOnly plaintext value={data.ramo_empresa_pl} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="profissao" as={Col} lg={6}>
              <Form.Label>Profissão</Form.Label>
              <Form.Control readOnly plaintext value={data.profissao} />
            </Form.Group>
            <Form.Group controlId="renda_mensal" as={Col} lg={6}>
              <Form.Label>Renda Mensal (R$)</Form.Label>
              <Form.Control readOnly plaintext value={data.renda} />
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
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>Seguro de Vida Individual - Dados do Cônjugue</Card.Header>
        <Card.Body>
          <Form.Row>
            <Form.Group controlId="inserir_conjugue" as={Col} lg={12}>
              <Form.Label>Inserir cônjugue como dependente?</Form.Label>
              <Form.Control readOnly plaintext value={data.inserir_conjugue} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="cpf_conjugue" as={Col} lg={4}>
              <Form.Label>CPF</Form.Label>
              <Form.Control readOnly plaintext value={data.cpf_conjugue} />
            </Form.Group>
            <Form.Group controlId="genero_conjugue" as={Col} lg={4}>
              <Form.Label>Genero</Form.Label>
              <Form.Control readOnly plaintext value={data.genero_conjugue} />
            </Form.Group>
            <Form.Group controlId="data_nascimento_conjugue" as={Col} lg={4}>
              <Form.Label>Data Nascimento</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={data.data_nascimento_conjugue}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="rg_conjugue" as={Col} lg={4}>
              <Form.Label>RG</Form.Label>
              <Form.Control readOnly plaintext value={data.rg_conjugue} />
            </Form.Group>
            <Form.Group controlId="rg_expedidor_conjugue" as={Col} lg={4}>
              <Form.Label>Órgão Expedidor</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={data.rg_expedidor_conjugue}
              />
            </Form.Group>
            <Form.Group controlId="rg_data_expedicao_conjugue" as={Col} lg={4}>
              <Form.Label>Data Expedição</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={data.rg_data_expedicao_conjugue}
              />
            </Form.Group>
          </Form.Row>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>
          Seguro de Vida Individual - Endereço Residencial
        </Card.Header>
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
        <Card.Header>
          Seguro de Vida Individual - Endereço Comercial
        </Card.Header>
        <Card.Body>
          <Form.Row>
            <Form.Group controlId="possui_endereco_comercial" as={Col} lg={12}>
              <Form.Label>Possui Endereço Comercial?</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={data.possui_endereco_comercial}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="cep_comercial" as={Col} lg={4}>
              <Form.Label>CEP</Form.Label>
              <Form.Control plaintext readOnly value={data.cep_comercial} />
            </Form.Group>
            <Form.Group controlId="uf_comercial" as={Col} lg={4}>
              <Form.Label>UF</Form.Label>
              <Form.Control plaintext readOnly value={data.uf_comercial} />
            </Form.Group>
            <Form.Group controlId="cidade_comercial" as={Col} lg={4}>
              <Form.Label>Cidade</Form.Label>
              <Form.Control plaintext readOnly value={data.cidade_comercial} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="logradouro_comercial" as={Col}>
              <Form.Label>Logradouro</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={data.logradouro_comercial}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="endereco_numero_comercial" as={Col} lg={3}>
              <Form.Label>Número</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={data.endereco_numero_comercial}
              />
            </Form.Group>
            <Form.Group controlId="complemento_comercial" as={Col} lg={9}>
              <Form.Label>Complemento</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={data.complemento_comercial}
              />
            </Form.Group>
          </Form.Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default SeguroVida;

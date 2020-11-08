import React from "react";
import { Card, Form, Col, InputGroup } from "react-bootstrap";

const SeguroVida = (props) => {
  return (
    <>
      <Card>
        <Card.Header>Seguro de Vida Individual - Dados do Segurado</Card.Header>
        <Card.Body>
          <Form.Row>
            <Form.Group controlId="genero" as={Col} lg={4}>
              <Form.Label>Genero</Form.Label>
              <Form.Control plaintext readOnly value={props.data.genero} />
            </Form.Group>
            <Form.Group controlId="data_nascimento" as={Col} lg={4}>
              <Form.Label>Data Nascimento</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={props.data.data_nascimento}
              />
            </Form.Group>
            <Form.Group controlId="estado_civil" as={Col} lg={2}>
              <Form.Label>Estado Civil</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={props.data.estado_civil}
              />
            </Form.Group>
            <Form.Group controlId="fumante" as={Col} lg={2}>
              <Form.Label>Fumante</Form.Label>
              <Form.Control readOnly plaintext value={props.data.fumante} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="regime_de_trabalho" as={Col} lg={12}>
              <Form.Label>Regime de Trabalho</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={props.data.regime_de_trabalho}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="nome_empresa_clt" as={Col} lg={6}>
              <Form.Label>Nome da Empresa (CLT)</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={props.data.nome_empresa_clt}
              />
            </Form.Group>
            <Form.Group controlId="ramo_empresa_pl" as={Col} lg={6}>
              <Form.Label>Ramo da Empresa (PL)</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={props.data.ramo_empresa_pl}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="profissao" as={Col} lg={6}>
              <Form.Label>Profissão</Form.Label>
              <Form.Control readOnly plaintext value={props.data.profissao} />
            </Form.Group>
            <Form.Group controlId="renda" as={Col} lg={6}>
              <Form.Label>Renda (R$)</Form.Label>
              <Form.Control readOnly plaintext value={props.data.renda} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="rg" as={Col} lg={4}>
              <Form.Label>RG</Form.Label>
              <Form.Control readOnly plaintext value={props.data.rg} />
            </Form.Group>
            <Form.Group controlId="rg_expedidor" as={Col} lg={4}>
              <Form.Label>Órgão Expedidor</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={props.data.rg_expedidor}
              />
            </Form.Group>
            <Form.Group controlId="rg_data_expedicao" as={Col} lg={4}>
              <Form.Label>Data Expedição</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={props.data.rg_data_expedicao}
              />
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
              <Form.Control
                readOnly
                plaintext
                value={props.data.inserir_conjugue}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="cpf_conjugue" as={Col} lg={4}>
              <Form.Label>CPF</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={props.data.cpf_conjugue}
              />
            </Form.Group>
            <Form.Group controlId="genero_conjugue" as={Col} lg={4}>
              <Form.Label>Genero</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={props.data.genero_conjugue}
              />
            </Form.Group>
            <Form.Group controlId="data_nascimento_conjugue" as={Col} lg={4}>
              <Form.Label>Data Nascimento</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={props.data.data_nascimento_conjugue}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="rg_conjugue" as={Col} lg={4}>
              <Form.Label>RG</Form.Label>
              <Form.Control readOnly plaintext value={props.data.rg_conjugue} />
            </Form.Group>
            <Form.Group controlId="rg_expedidor_conjugue" as={Col} lg={4}>
              <Form.Label>Órgão Expedidor</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={props.data.rg_expedidor_conjugue}
              />
            </Form.Group>
            <Form.Group controlId="rg_data_expedicao_conjugue" as={Col} lg={4}>
              <Form.Label>Data Expedição</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={props.data.rg_data_expedicao_conjugue}
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
              <Form.Control plaintext readOnly value={props.data.cep} />
            </Form.Group>
            <Form.Group controlId="uf" as={Col} lg={4}>
              <Form.Label>UF</Form.Label>
              <Form.Control plaintext readOnly value={props.data.uf} />
            </Form.Group>
            <Form.Group controlId="cidade" as={Col} lg={4}>
              <Form.Label>Cidade</Form.Label>
              <Form.Control plaintext readOnly value={props.data.cidade} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="logradouro" as={Col}>
              <Form.Label>Logradouro</Form.Label>
              <Form.Control plaintext readOnly value={props.data.logradouro} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="endereco_numero" as={Col} lg={3}>
              <Form.Label>Número</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={props.data.endereco_numero}
              />
            </Form.Group>
            <Form.Group controlId="complemento" as={Col} lg={9}>
              <Form.Label>Complemento</Form.Label>
              <Form.Control plaintext readOnly value={props.data.complemento} />
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
                value={props.data.possui_endereco_comercial}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="cep_comercial" as={Col} lg={4}>
              <Form.Label>CEP</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={props.data.cep_comercial}
              />
            </Form.Group>
            <Form.Group controlId="uf_comercial" as={Col} lg={4}>
              <Form.Label>UF</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={props.data.uf_comercial}
              />
            </Form.Group>
            <Form.Group controlId="cidade_comercial" as={Col} lg={4}>
              <Form.Label>Cidade</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={props.data.cidade_comercial}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="logradouro_comercial" as={Col}>
              <Form.Label>Logradouro</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={props.data.logradouro_comercial}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="endereco_numero_comercial" as={Col} lg={3}>
              <Form.Label>Número</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={props.data.endereco_numero_comercial}
              />
            </Form.Group>
            <Form.Group controlId="complemento_comercial" as={Col} lg={9}>
              <Form.Label>Complemento</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={props.data.complemento_comercial}
              />
            </Form.Group>
          </Form.Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default SeguroVida;

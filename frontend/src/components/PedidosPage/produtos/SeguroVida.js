import React from "react";

import { Card, Form, Col, InputGroup } from "react-bootstrap";

const SeguroVida = ({ data }) => {
  return (
    <>
      <Card>
        <Card.Header>Dados do Segurado</Card.Header>
        <Card.Body>
          <Form.Row>
            <Form.Group controlId="genero" as={Col} lg={4}>
              <Form.Label>Genero</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={
                  {
                    masculino: "Masculino",
                    feminino: "Feminino",
                  }[data.genero]
                }
              />
            </Form.Group>
            <Form.Group controlId="data_nascimento" as={Col} lg={4}>
              <Form.Label>Data Nascimento</Form.Label>
              <Form.Control readOnly plaintext value={data.data_nascimento} />
            </Form.Group>
            <Form.Group controlId="estado_civil" as={Col} lg={2}>
              <Form.Label>Estado Civil</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={
                  {
                    solteiro: "Solteiro(a)",
                    casado: "Casado(a) ou União Estável",
                    viuvo: "Viúvo(a)",
                    separado: "Separado(a) ou Divorciado(a)",
                  }[data.estado_civil]
                }
              />
            </Form.Group>
            <Form.Group controlId="fumante" as={Col} lg={2}>
              <Form.Label>Fumante</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={data.fumante === "sim" ? "Sim" : "Não"}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="regime_de_trabalho" as={Col} lg={12}>
              <Form.Label>Regime de Trabalho</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={
                  data.regime_de_trabalho === "clt"
                    ? "CLT"
                    : "Profissional Liberal"
                }
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
              <Form.Label>Renda Mensal</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>R$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control readOnly value={data.renda_mensal} />
              </InputGroup>
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
        <Card.Header>Dados do Cônjugue</Card.Header>
        <Card.Body>
          <Form.Row>
            <Form.Group controlId="inserir_conjugue" as={Col} lg={12}>
              <Form.Label>Inserir cônjugue como dependente?</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={data.inserir_conjugue === "sim" ? "Sim" : "Não"}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="cpf_conjugue" as={Col} lg={4}>
              <Form.Label>CPF</Form.Label>
              <Form.Control readOnly plaintext value={data.cpf_conjugue} />
            </Form.Group>
            <Form.Group controlId="genero_conjugue" as={Col} lg={4}>
              <Form.Label>Genero</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={
                  {
                    masculino: "Masculino",
                    feminino: "Feminino",
                  }[data.genero_conjugue]
                }
              />
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
        <Card.Header>Endereço Residencial</Card.Header>
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
        <Card.Header>Endereço Comercial</Card.Header>
        <Card.Body>
          <Form.Row>
            <Form.Group controlId="possui_endereco_comercial" as={Col} lg={12}>
              <Form.Label>Possui Endereço Comercial?</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={data.possui_endereco_comercial === "sim" ? "Sim" : "Não"}
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
      <Card>
        <Card.Header>Dados do Serviço</Card.Header>
        <Card.Body>
          <Form.Row>
            <Form.Group controlId="pacote" as={Col} lg={12}>
              <Form.Label>Pacote de Serviço</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={
                  {
                    morte_inv_1: "1 - Morte + Invalidez por acidente",
                    morte_inv_2: "2 - Morte + Invalidez por acidente",
                    morte_morte_ac_d_inv:
                      "3 - Morte + Morte Acidental (Em Dólar) + Invalidez por Acidente",
                    morte_morte_ac_d_inv_d:
                      "4 - Morte + Morte Acidental (Em Dólar) + Invalidez por Acidente (Em Dólar)",
                    personalizado: "Personalizado",
                  }[data.pacote]
                }
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="plano_capital" as={Col} lg={6}>
              <Form.Label>Capital</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>R$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control readOnly value={data.plano_capital} />
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="plano_assistencia_funeral" as={Col} lg={6}>
              <Form.Label>Assistencia Funeral</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={
                  {
                    nao_contratada: "Não Contratada",
                    individual: "Individual R$ 10.000,00",
                    familiar: "Familiar R$ 10.000,00",
                  }[data.plano_assistencia_funeral]
                }
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="plano_doencas" as={Col} lg={6}>
              <Form.Label>Doenças Graves</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={
                  {
                    nao_contratada: "Não Contratada",
                    "10_tipos": "10 Tipos",
                    "17_tipos": "17 Tipos",
                  }[data.plano_doencas]
                }
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId="plano_capital_doencas" as={Col} lg={6}>
              <Form.Label>Capital de Doenças Graves</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>R$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  readOnly
                  value={
                    {
                      "0": "N/A",
                      "10000": "10.000,00",
                      "20000": "20.000,00",
                      "30000": "30.000,00",
                      "40000": "40.000,00",
                      "50000": "50.000,00",
                      "60000": "60.000,00",
                      "70000": "70.000,00",
                      "80000": "80.000,00",
                      "90000": "90.000,00",
                      "100000": "100.000,00",
                      "110000": "110.000,00",
                      "120000": "120.000,00",
                      "130000": "130.000,00",
                      "140000": "140.000,00",
                      "150000": "150.000,00",
                      "160000": "160.000,00",
                      "170000": "170.000,00",
                      "180000": "180.000,00",
                      "190000": "190.000,00",
                      "200000": "200.000,00",
                    }[data.plano_capital_doencas]
                  }
                />
              </InputGroup>
            </Form.Group>
          </Form.Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default SeguroVida;

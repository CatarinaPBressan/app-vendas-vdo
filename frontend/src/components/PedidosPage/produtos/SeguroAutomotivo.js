import React from "react";
import { Card, Form, Col, InputGroup } from "react-bootstrap";

import { FileDownloadButton } from "../FileDownloadButton";

const SeguroAutomotivo = ({ usuario, data }) => {
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
            <Form.Group controlId="estado_civil" as={Col} lg={4}>
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
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="data_primeira_habilitacao" as={Col} lg={12}>
              <Form.Label>Data da Primeira Habilitação</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={data.data_primeira_habilitacao}
              />
            </Form.Group>
          </Form.Row>
          <hr />
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
        <Card.Header>Dados do Proprietário do Veículo</Card.Header>
        <Card.Body>
          <Form.Row>
            <Form.Group controlId="nome_completo_proprietario" as={Col} lg={6}>
              <Form.Label>Nome Completo</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={data.nome_completo_proprietario}
              />
            </Form.Group>
            <Form.Group controlId="cpf_proprietario" as={Col} lg={6}>
              <Form.Label>CPF</Form.Label>
              <Form.Control readOnly plaintext value={data.cpf_proprietario} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="genero_proprietario" as={Col} lg={4}>
              <Form.Label>Genero</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={
                  {
                    masculino: "Masculino",
                    feminino: "Feminino",
                  }[data.genero_proprietario]
                }
              />
            </Form.Group>
            <Form.Group
              controlId="data_nascimento_proprietario"
              as={Col}
              lg={4}
            >
              <Form.Label>Data Nascimento</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={data.data_nascimento_proprietario}
              />
            </Form.Group>
            <Form.Group controlId="estado_civil_proprietario" as={Col} lg={4}>
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
                  }[data.estado_civil_proprietario]
                }
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group
              controlId="data_primeira_habilitacao_proprietario"
              as={Col}
              lg={4}
            >
              <Form.Label>Data da Primeira Habilitação</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={data.data_primeira_habilitacao_proprietario}
              />
            </Form.Group>
            <Form.Group
              controlId="relacao_segurado_proprietario"
              as={Col}
              lg={4}
            >
              <Form.Label>Relação com Segurado</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={
                  {
                    proprio: "(Próprio)",
                    conjuge: "Cônjuge",
                    filho: "Filho(a)",
                    outra_pf: "Outra PF",
                    outra_pj: "Outra PJ",
                  }[data.relacao_segurado_proprietario]
                }
              />
            </Form.Group>
            <Form.Group
              controlId="numero_veiculos_proprietario"
              as={Col}
              lg={4}
            >
              <Form.Label>Quantos Veículos Possui</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={data.numero_veiculos_proprietario}
              />
            </Form.Group>
          </Form.Row>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>Dados do Condutor Principal</Card.Header>
        <Card.Body>
          <Form.Row>
            <Form.Group
              controlId="nome_completo_condutor_principal"
              as={Col}
              lg={6}
            >
              <Form.Label>Nome Completo</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={data.nome_completo_condutor_principal}
              />
            </Form.Group>
            <Form.Group controlId="cpf_condutor_principal" as={Col} lg={6}>
              <Form.Label>CPF</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={data.cpf_condutor_principal}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="genero_condutor_principal" as={Col} lg={4}>
              <Form.Label>Genero</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={
                  {
                    masculino: "Masculino",
                    feminino: "Feminino",
                  }[data.genero_condutor_principal]
                }
              />
            </Form.Group>
            <Form.Group
              controlId="data_nascimento_condutor_principal"
              as={Col}
              lg={4}
            >
              <Form.Label>Data Nascimento</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={data.data_nascimento_condutor_principal}
              />
            </Form.Group>
            <Form.Group
              controlId="estado_civil_condutor_principal"
              as={Col}
              lg={4}
            >
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
                  }[data.estado_civil_condutor_principal]
                }
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group
              controlId="data_primeira_habilitacao_condutor_principal"
              as={Col}
              lg={4}
            >
              <Form.Label>Data da Primeira Habilitação</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={data.data_primeira_habilitacao_condutor_principal}
              />
            </Form.Group>
            <Form.Group
              controlId="relacao_segurado_condutor_principal"
              as={Col}
              lg={4}
            >
              <Form.Label>Relação com Segurado</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={
                  {
                    proprio: "(Próprio)",
                    conjuge: "Cônjuge",
                    filho: "Filho(a)",
                    outra_pf: "Outra PF",
                    outra_pj: "Outra PJ",
                  }[data.relacao_segurado_condutor_principal]
                }
              />
            </Form.Group>
            <Form.Group
              controlId="profissao_condutor_principal"
              as={Col}
              lg={4}
            >
              <Form.Label>Profissão</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={data.profissao_condutor_principal}
              />
            </Form.Group>
          </Form.Row>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>Utilização do Veículo</Card.Header>
        <Card.Body>
          <Form.Row>
            <Form.Group controlId="tipo_de_uso" as={Col} lg={6}>
              <Form.Label>Tipo de Uso</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={
                  {
                    lazer: "Apenas Lazer",
                    diaria: "Locomoção Diária",
                    servico: "Prestação Serviço",
                    transporte_aplicativo: "Transporte por Aplicativo",
                  }[data.tipo_de_uso]
                }
              />
            </Form.Group>
            <Form.Group controlId="construcao" as={Col} lg={6}>
              <Form.Label>CEP Pernoite</Form.Label>
              <Form.Control plaintext readOnly value={data.cep_pernoite} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="roubo_furto_dois_anos" as={Col} lg={6}>
              <Form.Label>
                Houve roubo ou furto nos últimos dois anos?
              </Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={{ sim: "Sim", nao: "Não" }[data.roubo_furto_dois_anos]}
              />
            </Form.Group>
            <Form.Group controlId="condutor_eventual_jovem" as={Col} lg={6}>
              <Form.Label>
                Haverá condutor eventual entre 17 e 25 anos?
              </Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={{ sim: "Sim", nao: "Não" }[data.condutor_eventual_jovem]}
              />
            </Form.Group>
          </Form.Row>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>Residência e Estacionamento</Card.Header>
        <Card.Body>
          <Form.Row>
            <Form.Group controlId="tipo_residencia" as={Col} lg={6}>
              <Form.Label>Tipo de Residência</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={
                  {
                    casa: "Casa/Sobrado",
                    casa_condominio: "Casa em Condomínio",
                    apartamento: "Apartamento/Flat",
                    rural: "Chácara/Fazenda/Sítio",
                    outros: "Outros",
                  }[data.tipo_residencia]
                }
              />
            </Form.Group>
            <Form.Group controlId="local_pernoite" as={Col} lg={6}>
              <Form.Label>Local de Pernoite</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={
                  {
                    garagem_manual: "Garagem/Estacionamento com portão manual",
                    garagem_automatica:
                      "Garagem/Estacionamento com portão automático",
                    garagem_paga: "Garagem/Estacionamento local pago",
                    nao_garagem:
                      "Não pernoita em garagem/estacionamento fechado",
                  }[data.local_pernoite]
                }
              />
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <Form.Label>
              Utiliza veículo para ir e voltar do trabalho? Quais horários?
            </Form.Label>
            <Form.Check
              type="checkbox"
              defaultChecked={data.trabalho.includes("manha")}
              disabled
              label="Manhã"
            />
            <Form.Check
              type="checkbox"
              defaultChecked={data.trabalho.includes("tarde")}
              disabled
              label="Tarde"
            />
            <Form.Check
              type="checkbox"
              defaultChecked={data.trabalho.includes("noite")}
              disabled
              label="Noite"
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>
              Utiliza veículo para ir e voltar do local de estudo? Quais
              horários?
            </Form.Label>
            <Form.Check
              type="checkbox"
              defaultChecked={data.estudo.includes("manha")}
              disabled
              label="Manhã"
            />
            <Form.Check
              type="checkbox"
              defaultChecked={data.estudo.includes("tarde")}
              disabled
              label="Tarde"
            />
            <Form.Check
              type="checkbox"
              defaultChecked={data.estudo.includes("noite")}
              disabled
              label="Noite"
            />
          </Form.Group>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>Dados do Veículo</Card.Header>
        <Card.Body>
          <Form.Group controlId="chassi">
            <Form.Label>Chassi</Form.Label>
            <br />
            <FileDownloadButton usuario={usuario} fileData={data.chassi} />
          </Form.Group>
          <Form.Row>
            <Form.Group controlId="veiculo_financiado" as={Col} lg={6}>
              <Form.Label>Veículo é financiado?</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={data.veiculo_financiado}
              />
            </Form.Group>
            <Form.Group controlId="dispositivo_antifurto" as={Col} lg={6}>
              <Form.Label>Dispositivo Antifurto</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={data.dispositivo_antifurto}
              />
            </Form.Group>
          </Form.Row>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>Dados do serviço</Card.Header>
        <Card.Body>
          <Form.Row>
            <Form.Group controlId="pacote" as={Col} lg={12}>
              <Form.Label>Pacote de Serviço</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={
                  {
                    auto_padrao: "Auto - Cotação Padrão",
                    moto_padrao: "Moto - Cotação Padrão",
                    personalizado: "Personalizado",
                  }[data.pacote]
                }
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="pacote_franquia" as={Col} lg={6}>
              <Form.Label>Tipo de Franquia</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={
                  { reduzida: "Reduzida", obrigatoria: "Obrigatória" }[
                    data.pacote_franquia
                  ]
                }
              />
            </Form.Group>
            <Form.Group controlId="pacote_colisao" as={Col} lg={6}>
              <Form.Label>Colisão/Incêndio/Roubo</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={
                  {
                    nao_contratada: "Não contradada",
                    "100_fipe": "R$ (100% FIPE)",
                  }[data.pacote_colisao]
                }
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="pacote_danos_materiais" as={Col} lg={4}>
              <Form.Label>Danos Materiais</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>R$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  readOnly
                  value={
                    {
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
                      "150000": "150.000,00",
                      "200000": "200.000,00",
                      "250000": "250.000,00",
                      "300000": "300.000,00",
                      "350000": "350.000,00",
                      "400000": "400.000,00",
                      "450000": "450.000,00",
                      "500000": "500.000,00",
                    }[data.pacote_danos_materiais]
                  }
                />
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="pacote_danos_corporais" as={Col} lg={4}>
              <Form.Label>Danos Corporais</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>R$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  readOnly
                  value={
                    {
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
                      "150000": "150.000,00",
                      "200000": "200.000,00",
                      "250000": "250.000,00",
                      "300000": "300.000,00",
                      "350000": "350.000,00",
                      "400000": "400.000,00",
                      "450000": "450.000,00",
                      "500000": "500.000,00",
                    }[data.pacote_danos_corporais]
                  }
                />
              </InputGroup>
            </Form.Group>
            <Form.Group controlId="pacote_danos_morais" as={Col} lg={4}>
              <Form.Label>Danos Morais</Form.Label>
              <InputGroup>
                <InputGroup.Prepend>
                  <InputGroup.Text>R$</InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  readOnly
                  value={
                    {
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
                    }[data.pacote_danos_morais]
                  }
                />
              </InputGroup>
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="pacote_carro_reserva" as={Col} lg={3}>
              <Form.Label>Carro Reserva</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={
                  {
                    nao_contratar: "Não contratar",
                    basico_7_dias: "Básico 7 dias",
                  }[data.pacote_carro_reserva]
                }
              />
            </Form.Group>
            <Form.Group controlId="pacote_assistencia_24_horas" as={Col} lg={3}>
              <Form.Label>Assistência 24 horas</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={
                  {
                    nao_contratar: "Não contratar",
                    "200km": "200KM",
                    ilimitado: "Max / Ilimitado",
                  }[data.pacote_assistencia_24_horas]
                }
              />
            </Form.Group>
            <Form.Group controlId="pacote_vidros" as={Col} lg={3}>
              <Form.Label>Vidros</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={{ sim: "Sim", nao: "Não" }[data.pacote_vidros]}
              />
            </Form.Group>
            <Form.Group controlId="pacote_farol_retrovisor" as={Col} lg={3}>
              <Form.Label>Farol Retrovisor</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={{ sim: "Sim", nao: "Não" }[data.pacote_farol_retrovisor]}
              />
            </Form.Group>
          </Form.Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default SeguroAutomotivo;

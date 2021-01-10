import React from "react";
import { Card, Form, Col } from "react-bootstrap";

import { FileDownloadButton } from "../FileDownloadButton";

const SeguroAutomotivo = (props) => {
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
                defaultChecked={props.data.novo_ou_renovacao === "novo"}
                disabled
              />
              <Form.Check
                type="radio"
                label="Renovação"
                defaultChecked={props.data.novo_ou_renovacao === "renovacao"}
                disabled
              />
            </Form.Group>
          </Form.Row>
          {props.data.novo_ou_renovacao === "renovacao" && (
            <Form.Row>
              <Form.Group controlId="apolice_atual" as={Col}>
                <Form.Label>Apólice atual</Form.Label>
                <br />
                <FileDownloadButton
                  usuario={props.usuario}
                  fileData={props.data.apolice_atual}
                />
              </Form.Group>
            </Form.Row>
          )}
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>Dados Adicionais do Segurado</Card.Header>
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
            <Form.Group controlId="estado_civil" as={Col} lg={4}>
              <Form.Label>Estado Civil</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={props.data.estado_civil}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="data_primeira_habilitacao" as={Col} lg={12}>
              <Form.Label>Data da Primeira Habilitação</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={props.data.data_primeira_habilitacao}
              />
            </Form.Group>
          </Form.Row>
          <hr />
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
        <Card.Header>Dados do proprietário do veículo</Card.Header>
        <Card.Body>
          <Form.Row>
            <Form.Group controlId="nome_completo_proprietario" as={Col} lg={6}>
              <Form.Label>Nome Completo</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={props.data.nome_completo_proprietario}
              />
            </Form.Group>
            <Form.Group controlId="cpf_proprietario" as={Col} lg={6}>
              <Form.Label>CPF</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={props.data.cpf_proprietario}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="genero_proprietario" as={Col} lg={4}>
              <Form.Label>Genero</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={props.data.genero_proprietario}
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
                value={props.data.data_nascimento_proprietario}
              />
            </Form.Group>
            <Form.Group controlId="estado_civil_proprietario" as={Col} lg={4}>
              <Form.Label>Estado Civil</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={props.data.estado_civil_proprietario}
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
                value={props.data.data_primeira_habilitacao_proprietario}
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
                value={props.data.relacao_segurado_proprietario}
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
                value={props.data.numero_veiculos_proprietario}
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
                value={props.data.nome_completo_condutor_principal}
              />
            </Form.Group>
            <Form.Group controlId="cpf_condutor_principal" as={Col} lg={6}>
              <Form.Label>CPF</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={props.data.cpf_condutor_principal}
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="genero_condutor_principal" as={Col} lg={4}>
              <Form.Label>Genero</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={props.data.genero_condutor_principal}
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
                value={props.data.data_nascimento_condutor_principal}
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
                value={props.data.estado_civil_condutor_principal}
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
                value={props.data.data_primeira_habilitacao_condutor_principal}
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
                value={props.data.relacao_segurado_condutor_principal}
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
                value={props.data.profissao_condutor_principal}
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
              <Form.Control plaintext readOnly value={props.data.tipo_de_uso} />
            </Form.Group>
            <Form.Group controlId="construcao" as={Col} lg={6}>
              <Form.Label>CEP Pernoite</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={props.data.cep_pernoite}
              />
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
                value={props.data.roubo_furto_dois_anos}
              />
            </Form.Group>
            <Form.Group controlId="condutor_eventual_jovem" as={Col} lg={6}>
              <Form.Label>
                Haverá condutor eventual entre 17 e 25 anos?
              </Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={props.data.condutor_eventual_jovem}
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
                value={props.data.tipo_residencia}
              />
            </Form.Group>
            <Form.Group controlId="local_pernoite" as={Col} lg={6}>
              <Form.Label>Local de Pernoite</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={props.data.local_pernoite}
              />
            </Form.Group>
          </Form.Row>
          <Form.Group>
            <Form.Label>
              Utiliza veículo para ir e voltar do trabalho? Quais horários?
            </Form.Label>
            <Form.Check
              type="checkbox"
              defaultChecked={props.data.trabalho.includes("manha")}
              disabled
              label="Manhã"
            />
            <Form.Check
              type="checkbox"
              defaultChecked={props.data.trabalho.includes("tarde")}
              disabled
              label="Tarde"
            />
            <Form.Check
              type="checkbox"
              defaultChecked={props.data.trabalho.includes("noite")}
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
              defaultChecked={props.data.estudo.includes("manha")}
              disabled
              label="Manhã"
            />
            <Form.Check
              type="checkbox"
              defaultChecked={props.data.estudo.includes("tarde")}
              disabled
              label="Tarde"
            />
            <Form.Check
              type="checkbox"
              defaultChecked={props.data.estudo.includes("noite")}
              disabled
              label="Noite"
            />
          </Form.Group>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>Dados do veículo</Card.Header>
        <Card.Body>
          <Form.Group controlId="chassi">
            <Form.Label>Chassi</Form.Label>
            <br />
            <FileDownloadButton
              usuario={props.usuario}
              fileData={props.data.chassi}
            />
          </Form.Group>
          <Form.Row>
            <Form.Group controlId="veiculo_financiado" as={Col} lg={6}>
              <Form.Label>Veículo é financiado?</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={props.data.veiculo_financiado}
              />
            </Form.Group>
            <Form.Group controlId="dispositivo_antifurto" as={Col} lg={6}>
              <Form.Label>Dispositivo Antifurto</Form.Label>
              <Form.Control
                readOnly
                plaintext
                value={props.data.dispositivo_antifurto}
              />
            </Form.Group>
          </Form.Row>
        </Card.Body>
      </Card>
    </>
  );
};

export default SeguroAutomotivo;

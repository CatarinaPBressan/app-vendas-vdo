import React, { useState } from "react";

import { Card, Form } from "react-bootstrap";
import InputMask from "react-input-mask";

import { FIELDS, UFS_BRASIL } from "../../../constants/fields";
import { getFileNameFromPath } from "../../../utils/utils";

const SeguroAutomotivo = ({ nomeCompleto, cpf }) => {
  ///
  const [isRenovacao, setIsRenovacao] = useState(false);
  const onIsRenovacaoChange = (e) => {
    setIsRenovacao(e.target.value === "renovacao");
  };
  const [apoliceAtualLabel, setApoliceAtualLabel] = useState("Apólice Atual");
  const onApoliceFileChange = (e) => {
    setApoliceAtualLabel(getFileNameFromPath(e.target.value));
  };
  ///
  ///
  const [seguradoGenero, setSeguradoGenero] = useState("");
  const onSeguradoGeneroChange = (e) => {
    setSeguradoGenero(e.target.value);
  };
  //
  const [seguradoDataNascimento, setSeguradoDataNascimento] = useState("");
  const onSeguradoDataNascimentoChange = (e) => {
    setSeguradoDataNascimento(e.target.value);
  };
  //
  const [seguradoEstadoCivil, setSeguradoEstadoCivil] = useState("");
  const onSeguradoEstadoCivilChange = (e) => {
    setSeguradoEstadoCivil(e.target.value);
  };
  const [
    seguradoDataPrimeiraHabilitacao,
    setSeguradoDataPrimeiraHabilitacao,
  ] = useState("");
  const onSeguradoDataPrimeiraHabilitacaoChange = (e) => {
    setSeguradoDataPrimeiraHabilitacao(e.target.value);
  };
  ///
  ///
  const [isProprietarioSegurado, setIsProprietarioSegurado] = useState(true);
  const onProprietarioVeiculoChange = (e) => {
    setIsProprietarioSegurado(e.target.value === "segurado");
    console.log(e.target.value);
  };
  //
  const [proprietarioNomeCompleto, setProprietarioNomeCompleto] = useState("");
  const onProprietarioNomeCompletoChange = (e) => {
    setProprietarioNomeCompleto(e.target.value);
  };
  //
  const [proprietarioCPF, setProprietarioCPF] = useState("");
  const onProprietarioCPFChange = (e) => {
    setProprietarioCPF(e.target.value);
  };
  //
  const [proprietarioGenero, setProprietarioGenero] = useState("");
  const onProprietarioGeneroChange = (e) => {
    setProprietarioGenero(e.target.value);
  };
  //
  const [proprietarioDataNascimento, setProprietarioDataNascimento] = useState(
    "",
  );
  const onProprietarioDataNascimentoChange = (e) => {
    setProprietarioDataNascimento(e.target.value);
  };
  //
  const [proprietarioEstadoCivil, setProprietarioEstadoCivil] = useState("");
  const onProprietarioEstadoCivilChange = (e) => {
    setProprietarioEstadoCivil(e.target.value);
  };
  //
  const [
    proprietarioDataPrimeiraHabilitacao,
    setProprietarioDataPrimeiraHabilitacao,
  ] = useState("");
  const onProprietarioDataPrimeiraHabilitacaoChange = (e) => {
    setProprietarioDataPrimeiraHabilitacao(e.target.value);
  };
  //
  const [
    proprietarioRelacaoSegurado,
    setProprietarioRelacaoSegurado,
  ] = useState("");
  const onProprietarioRelacaoSeguradoChange = (e) => {
    setProprietarioRelacaoSegurado(e.target.value);
  };
  ///
  ///
  const [
    isCondutorPrincipalSegurado,
    setIsCondutorPrincipalSegurado,
  ] = useState(true);
  const [
    isCondutorPrincipalProprietario,
    setIsCondutorPrincipalProprietario,
  ] = useState(false);
  const [isCondutorPrincipalOutro, setIsCondutorPrincipalOutro] = useState(
    false,
  );
  const onCondutorPrincipalChange = (e) => {
    setIsCondutorPrincipalSegurado(e.target.value === "segurado");
    setIsCondutorPrincipalProprietario(e.target.value === "proprietario");
    setIsCondutorPrincipalOutro(e.target.value === "outro");
  };
  //
  const [
    condutorPrincipalNomeCompleto,
    setCondutorPrincipalNomeCompleto,
  ] = useState("");
  const onCondutorPrincipalNomeCompletoChange = (e) => {
    setCondutorPrincipalNomeCompleto(e.target.value);
  };
  //
  const [condutorPrincipalCPF, setCondutorPrincipalCPF] = useState("");
  const onCondutorPrincipalCPFChange = (e) => {
    setCondutorPrincipalCPF(e.target.value);
  };
  //
  const [condutorPrincipalGenero, setCondutorPrincipalGenero] = useState("");
  const onCondutorPrincipalGeneroChange = (e) => {
    setCondutorPrincipalGenero(e.target.value);
  };
  //
  const [
    condutorPrincipalDataNascimento,
    setCondutorPrincipalDataNascimento,
  ] = useState("");
  const onCondutorPrincipalDataNascimentoChange = (e) => {
    setCondutorPrincipalDataNascimento(e.target.value);
  };
  //
  const [
    condutorPrincipalEstadoCivil,
    setCondutorPrincipalEstadoCivil,
  ] = useState("");
  const onCondutorPrincipalEstadoCivilChange = (e) => {
    setCondutorPrincipalEstadoCivil(e.target.value);
  };
  const [
    condutorPrincipalDataPrimeiraHabilitacao,
    setCondutorPrincipalDataPrimeiraHabilitacao,
  ] = useState("");
  const onCondutorPrincipalDataPrimeiraHabilitacaoChange = (e) => {
    setCondutorPrincipalDataPrimeiraHabilitacao(e.target.value);
  };
  //
  const [
    condutorPrincipalRelacaoSegurado,
    setCondutorPrincipalRelacaoSegurado,
  ] = useState("");
  const onCondutorPrincipalRelacaoSeguradoChange = (e) => {
    setCondutorPrincipalRelacaoSegurado(e.target.value);
  };
  ///
  ///
  const [chassiLabel, setChassiLabel] = useState("Documento do Veículo");
  const onChassiFileChange = (e) => {
    setChassiLabel(getFileNameFromPath(e.target.value));
  };
  ///
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
          <Form.Group controlId="genero">
            <Form.Label>Genero</Form.Label>
            <Form.Control
              as="select"
              name="genero"
              required
              onChange={onSeguradoGeneroChange}
              value={seguradoGenero}
            >
              <option value="">(Selecione)</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="data_nascimento">
            <Form.Label>Data Nascimento</Form.Label>
            <InputMask
              mask={FIELDS.data.mask}
              onChange={onSeguradoDataNascimentoChange}
              value={seguradoDataNascimento}
            >
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
            <Form.Control
              as="select"
              name="estado_civil"
              required
              onChange={onSeguradoEstadoCivilChange}
              value={seguradoEstadoCivil}
            >
              <option value="">(Selecione)</option>
              <option value="solteiro">Solteiro(a)</option>
              <option value="casado">Casado(a) ou União Estável</option>
              <option value="viuvo">Viúvo(a)</option>
              <option value="separado">Separado(a) ou Divorciado(a)</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="data_primeira_habilitacao">
            <Form.Label>Data da Primeira Habilitação</Form.Label>
            <InputMask
              mask={FIELDS.data.mask}
              onChange={onSeguradoDataPrimeiraHabilitacaoChange}
              value={seguradoDataPrimeiraHabilitacao}
            >
              {() => (
                <Form.Control
                  type="text"
                  placeholder={FIELDS.data.placeholder}
                  pattern={FIELDS.data.pattern}
                  inputMode="numeric"
                  name="data_primeira_habilitacao"
                  required
                />
              )}
            </InputMask>
          </Form.Group>
          <hr />
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
        <Card.Header>Dados do Proprietário do Veículo</Card.Header>
        <Card.Body>
          <Form.Group>
            <Form.Label>Quem é o proprietário do veículo?</Form.Label>
            <Form.Check
              type="radio"
              id="proprietario_do_veiculo_segurado"
              name="proprietario_do_veiculo"
              value="segurado"
              label="Segurado"
              defaultChecked
              onChange={onProprietarioVeiculoChange}
            />
            <Form.Check
              type="radio"
              id="proprietario_do_veiculo_outro"
              name="proprietario_do_veiculo"
              value="outro"
              label="Outro"
              onChange={onProprietarioVeiculoChange}
            />
          </Form.Group>
          <Form.Group controlId="nome_completo_proprietario">
            <Form.Label>Nome Completo</Form.Label>
            <Form.Control
              name="nome_completo_proprietario"
              type="text"
              value={
                isProprietarioSegurado ? nomeCompleto : proprietarioNomeCompleto
              }
              required
              disabled={isProprietarioSegurado}
              onChange={onProprietarioNomeCompletoChange}
            />
          </Form.Group>
          <Form.Group controlId="cpf_proprietario">
            <Form.Label>CPF</Form.Label>
            {isProprietarioSegurado ? (
              <Form.Control
                name="cpf_proprietario"
                type="text"
                value={cpf}
                readOnly
                disabled
                required
              />
            ) : (
              <InputMask
                mask={FIELDS.cpf.mask}
                value={proprietarioCPF}
                onChange={onProprietarioCPFChange}
              >
                {() => (
                  <Form.Control
                    name="cpf_proprietario"
                    type="text"
                    placeholder={FIELDS.cpf.placeholder}
                    inputMode="numeric"
                    pattern={FIELDS.cpf.pattern}
                    required
                  />
                )}
              </InputMask>
            )}
            <Form.Text className="text-muted">Somente números</Form.Text>
          </Form.Group>
          <Form.Group controlId="genero_proprietario">
            <Form.Label>Genero</Form.Label>
            <Form.Control
              as="select"
              name="genero_proprietario"
              required
              disabled={isProprietarioSegurado}
              value={
                isProprietarioSegurado ? seguradoGenero : proprietarioGenero
              }
              onChange={onProprietarioGeneroChange}
            >
              <option value="">(Selecione)</option>
              <option value="masculino">Masculino</option>
              <option value="feminino">Feminino</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="data_nascimento_proprietario">
            <Form.Label>Data Nascimento</Form.Label>
            {isProprietarioSegurado ? (
              <Form.Control
                name="data_nascimento_proprietario"
                type="text"
                value={seguradoDataNascimento}
                readOnly
                disabled
                required
              />
            ) : (
              <InputMask
                mask={FIELDS.data.mask}
                value={proprietarioDataNascimento}
                onChange={onProprietarioDataNascimentoChange}
              >
                {() => (
                  <Form.Control
                    type="text"
                    placeholder={FIELDS.data.placeholder}
                    pattern={FIELDS.data.pattern}
                    inputMode="numeric"
                    name="data_nascimento_proprietario"
                    required
                  />
                )}
              </InputMask>
            )}
          </Form.Group>
          <Form.Group controlId="estado_civil_proprietario">
            <Form.Label>Estado Civil</Form.Label>
            <Form.Control
              as="select"
              name="estado_civil_proprietario"
              required
              disabled={isProprietarioSegurado}
              onChange={onProprietarioEstadoCivilChange}
              value={
                isProprietarioSegurado
                  ? seguradoEstadoCivil
                  : proprietarioEstadoCivil
              }
            >
              <option value="">(Selecione)</option>
              <option value="solteiro">Solteiro(a)</option>
              <option value="casado">Casado(a) ou União Estável</option>
              <option value="viuvo">Viúvo(a)</option>
              <option value="separado">Separado(a) ou Divorciado(a)</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="data_primeira_habilitacao_proprietario">
            <Form.Label>Data da Primeira Habilitação</Form.Label>
            {isProprietarioSegurado ? (
              <Form.Control
                name="data_primeira_habilitacao_proprietario"
                type="text"
                value={seguradoDataPrimeiraHabilitacao}
                readOnly
                disabled
                required
              />
            ) : (
              <InputMask
                mask={FIELDS.data.mask}
                value={proprietarioDataPrimeiraHabilitacao}
                onChange={onProprietarioDataPrimeiraHabilitacaoChange}
              >
                {() => (
                  <Form.Control
                    type="text"
                    placeholder={FIELDS.data.placeholder}
                    pattern={FIELDS.data.pattern}
                    inputMode="numeric"
                    name="data_primeira_habilitacao_proprietario"
                    required
                  />
                )}
              </InputMask>
            )}
          </Form.Group>
          <Form.Group controlId="relacao_segurado_proprietario">
            <Form.Label>Relação com Segurado</Form.Label>
            <Form.Control
              as="select"
              name="relacao_segurado_proprietario"
              required
              disabled={isProprietarioSegurado}
              value={
                isProprietarioSegurado ? "proprio" : proprietarioRelacaoSegurado
              }
              onChange={onProprietarioRelacaoSeguradoChange}
            >
              {isProprietarioSegurado ? (
                <>
                  <option value="proprio">(Próprio)</option>
                </>
              ) : (
                <>
                  <option value="">(Selecione)</option>
                  <option value="conjuge">Cônjuge</option>
                  <option value="filho">Filho(a)</option>
                  <option value="outra_pf">Outra PF</option>
                  <option value="outra_pj">Outra PJ</option>
                </>
              )}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="numero_veiculos_proprietario">
            <Form.Label>Quantos Veículos Possui</Form.Label>
            <Form.Control
              name="numero_veiculos_proprietario"
              type="number"
              required
              defaultValue={0}
            />
          </Form.Group>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>Dados do Condutor Principal</Card.Header>
        <Card.Body>
          <Card>
            <Card.Header>Dados Pessoais</Card.Header>
            <Card.Body>
              <Form.Group>
                <Form.Label>Quem é o condutor principal do veículo?</Form.Label>
                <Form.Check
                  type="radio"
                  id="condutor_principal_do_veiculo_segurado"
                  name="condutor_principal_do_veiculo"
                  value="segurado"
                  label="Segurado"
                  defaultChecked
                  onChange={onCondutorPrincipalChange}
                />
                <Form.Check
                  type="radio"
                  id="condutor_principal_do_veiculo_proprietario"
                  name="condutor_principal_do_veiculo"
                  value="proprietario"
                  label="Proprietário"
                  onChange={onCondutorPrincipalChange}
                />
                <Form.Check
                  type="radio"
                  id="condutor_principal_do_veiculo_outro"
                  name="condutor_principal_do_veiculo"
                  value="outro"
                  label="Outro"
                  onChange={onCondutorPrincipalChange}
                />
              </Form.Group>
              <Form.Group controlId="nome_completo_condutor_principal">
                <Form.Label>Nome Completo</Form.Label>
                <Form.Control
                  name="nome_completo_condutor_principal"
                  type="text"
                  value={
                    isCondutorPrincipalSegurado
                      ? nomeCompleto
                      : isCondutorPrincipalProprietario
                      ? proprietarioNomeCompleto
                      : condutorPrincipalNomeCompleto
                  }
                  required
                  disabled={!isCondutorPrincipalOutro}
                  onChange={onCondutorPrincipalNomeCompletoChange}
                />
              </Form.Group>
              <Form.Group controlId="cpf_condutor_principal">
                <Form.Label>CPF</Form.Label>
                {!isCondutorPrincipalOutro ? (
                  <Form.Control
                    name="cpf_condutor_principal"
                    type="text"
                    value={isCondutorPrincipalSegurado ? cpf : proprietarioCPF}
                    readOnly
                    disabled
                    required
                  />
                ) : (
                  <InputMask
                    mask={FIELDS.cpf.mask}
                    value={condutorPrincipalCPF}
                    onChange={onCondutorPrincipalCPFChange}
                  >
                    {() => (
                      <Form.Control
                        name="cpf_condutor_principal"
                        type="text"
                        placeholder={FIELDS.cpf.placeholder}
                        inputMode="numeric"
                        pattern={FIELDS.cpf.pattern}
                        required
                      />
                    )}
                  </InputMask>
                )}
                <Form.Text className="text-muted">Somente números</Form.Text>
              </Form.Group>
              <Form.Group controlId="genero_condutor_principal">
                <Form.Label>Genero</Form.Label>
                <Form.Control
                  as="select"
                  name="genero_condutor_principal"
                  required
                  disabled={!isCondutorPrincipalOutro}
                  value={
                    isCondutorPrincipalSegurado
                      ? seguradoGenero
                      : isCondutorPrincipalProprietario
                      ? proprietarioGenero
                      : condutorPrincipalGenero
                  }
                  onChange={onCondutorPrincipalGeneroChange}
                >
                  <option value="">(Selecione)</option>
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="data_nascimento_condutor_principal">
                <Form.Label>Data Nascimento</Form.Label>
                {!isCondutorPrincipalOutro ? (
                  <Form.Control
                    name="data_nascimento_condutor_principal"
                    type="text"
                    value={
                      isCondutorPrincipalSegurado
                        ? seguradoDataNascimento
                        : proprietarioDataNascimento
                    }
                    readOnly
                    disabled
                    required
                  />
                ) : (
                  <InputMask
                    mask={FIELDS.data.mask}
                    value={condutorPrincipalDataNascimento}
                    onChange={onCondutorPrincipalDataNascimentoChange}
                  >
                    {() => (
                      <Form.Control
                        name="data_nascimento_condutor_principal"
                        type="text"
                        placeholder={FIELDS.data.placeholder}
                        inputMode="numeric"
                        pattern={FIELDS.data.pattern}
                        required
                      />
                    )}
                  </InputMask>
                )}
                <Form.Text className="text-muted">Somente números</Form.Text>
              </Form.Group>
              <Form.Group controlId="estado_civil_condutor_principal">
                <Form.Label>Estado Civil</Form.Label>
                <Form.Control
                  as="select"
                  name="estado_civil_condutor_principal"
                  required
                  disabled={!isCondutorPrincipalOutro}
                  onChange={onCondutorPrincipalEstadoCivilChange}
                  value={
                    isCondutorPrincipalSegurado
                      ? seguradoEstadoCivil
                      : isCondutorPrincipalProprietario
                      ? proprietarioEstadoCivil
                      : condutorPrincipalEstadoCivil
                  }
                >
                  <option value="">(Selecione)</option>
                  <option value="solteiro">Solteiro(a)</option>
                  <option value="casado">Casado(a) ou União Estável</option>
                  <option value="viuvo">Viúvo(a)</option>
                  <option value="separado">Separado(a) ou Divorciado(a)</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="data_primeira_habilitacao_condutor_principal">
                <Form.Label>Data da Primeira Habilitação</Form.Label>
                {!isCondutorPrincipalOutro ? (
                  <Form.Control
                    name="data_primeira_habilitacao_condutor_principal"
                    type="text"
                    value={
                      isCondutorPrincipalSegurado
                        ? seguradoDataPrimeiraHabilitacao
                        : proprietarioDataPrimeiraHabilitacao
                    }
                    readOnly
                    disabled
                    required
                  />
                ) : (
                  <InputMask
                    mask={FIELDS.data.mask}
                    value={condutorPrincipalDataPrimeiraHabilitacao}
                    onChange={onCondutorPrincipalDataPrimeiraHabilitacaoChange}
                  >
                    {() => (
                      <Form.Control
                        name="data_primeira_habilitacao_condutor_principal"
                        type="text"
                        placeholder={FIELDS.data.placeholder}
                        inputMode="numeric"
                        pattern={FIELDS.data.pattern}
                        required
                      />
                    )}
                  </InputMask>
                )}
                <Form.Text className="text-muted">Somente números</Form.Text>
              </Form.Group>
              <Form.Group controlId="relacao_segurado_condutor_principal">
                <Form.Label>Relação com Segurado</Form.Label>
                <Form.Control
                  as="select"
                  name="relacao_segurado_condutor_principal"
                  required
                  disabled={!isCondutorPrincipalOutro}
                  onChange={onCondutorPrincipalRelacaoSeguradoChange}
                  value={
                    isCondutorPrincipalSegurado
                      ? "proprio"
                      : isCondutorPrincipalProprietario
                      ? proprietarioRelacaoSegurado
                      : condutorPrincipalRelacaoSegurado
                  }
                >
                  {isCondutorPrincipalSegurado ? (
                    <>
                      <option value="proprio">(Próprio)</option>
                    </>
                  ) : (
                    <>
                      <option value="">(Selecione)</option>
                      <option value="conjuge">Cônjuge</option>
                      <option value="filho">Filho(a)</option>
                      <option value="outra_pf">Outra PF</option>
                      <option value="outra_pj">Outra PJ</option>
                    </>
                  )}
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="profissao_condutor_principal">
                <Form.Label>Profissão</Form.Label>
                <Form.Control
                  type="text"
                  name="profissao_condutor_principal"
                  required
                />
              </Form.Group>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>Utilização do Veículo</Card.Header>
            <Card.Body>
              <Form.Group controlId="tipo_de_uso">
                <Form.Label>Tipo de Uso</Form.Label>
                <Form.Control as="select" name="tipo_de_uso" required>
                  <option value="">(Selecione)</option>
                  <option value="lazer">Apenas Lazer</option>
                  <option value="diaria">Locomoção Diária</option>
                  <option value="servico">Prestação Serviço</option>
                  <option value="transporte_aplicativo">
                    Transporte por Aplicativo
                  </option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="cep_pernoite">
                <Form.Label>CEP Pernoite</Form.Label>
                <Form.Control type="text" name="cep_pernoite" required />
              </Form.Group>
              <Form.Group controlId="roubo_furto_dois_anos">
                <Form.Label>
                  Houve roubo ou furto nos últimos dois anos?
                </Form.Label>
                <Form.Control as="select" name="roubo_furto_dois_anos" required>
                  <option value="">(Selecione)</option>
                  <option value="sim">Sim</option>
                  <option value="nao">Não</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="condutor_eventual_jovem">
                <Form.Label>
                  Haverá condutor eventual entre 17 e 25 anos?
                </Form.Label>
                <Form.Control
                  as="select"
                  name="condutor_eventual_jovem"
                  required
                >
                  <option value="">(Selecione)</option>
                  <option value="sim">Sim</option>
                  <option value="nao">Não</option>
                </Form.Control>
              </Form.Group>
            </Card.Body>
          </Card>
          <Card>
            <Card.Header>Residência e Estacionamento</Card.Header>
            <Card.Body>
              <Form.Group controlId="tipo_residencia">
                <Form.Label>Tipo de Residência</Form.Label>
                <Form.Control as="select" name="tipo_residencia" required>
                  <option value="">(Selecione)</option>
                  <option value="casa">Casa/Sobrado</option>
                  <option value="casa_condominio">Casa em Condomínio</option>
                  <option value="apartamento">Apartamento/Flat</option>
                  <option value="rural">Chácara/Fazenda/Sítio</option>
                  <option value="outros">Outros</option>
                </Form.Control>
              </Form.Group>
              <Form.Group controlId="local_pernoite">
                <Form.Label>Local de Pernoite</Form.Label>
                <Form.Control as="select" name="local_pernoite" required>
                  <option value="">(Selecione)</option>
                  <option value="garagem_manual">
                    Garagem/Estacionamento com portão manual
                  </option>
                  <option value="garagem_automatica">
                    Garagem/Estacionamento com portão automático
                  </option>
                  <option value="garagem_paga">
                    Garagem/Estacionamento local pago
                  </option>
                  <option value="nao_garagem">
                    Não pernoita em garagem/estacionamento fechado
                  </option>
                </Form.Control>
              </Form.Group>
              <Form.Group>
                <Form.Label>
                  Utiliza veículo para ir e voltar do trabalho? Quais horários?
                </Form.Label>
                <Form.Check
                  type="checkbox"
                  id="trabalho_manha"
                  name="trabalho"
                  value="manha"
                  label="Manhã"
                />
                <Form.Check
                  type="checkbox"
                  id="trabalho_tarde"
                  name="trabalho"
                  value="tarde"
                  label="Tarde"
                />
                <Form.Check
                  type="checkbox"
                  id="trabalho_noite"
                  name="trabalho"
                  value="noite"
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
                  id="estudo_manha"
                  name="estudo"
                  value="manha"
                  label="Manhã"
                />
                <Form.Check
                  type="checkbox"
                  id="estudo_tarde"
                  name="estudo"
                  value="tarde"
                  label="Tarde"
                />
                <Form.Check
                  type="checkbox"
                  id="estudo_noite"
                  name="estudo"
                  value="noite"
                  label="Noite"
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>Dados do veículo</Card.Header>
        <Card.Body>
          <Form.Group controlId="chassi">
            <Form.Label>Chassi</Form.Label>
            <Form.File
              name="chassi"
              required
              custom
              onChange={onChassiFileChange}
              label={chassiLabel}
            />
            <Form.Text className="text-muted">Obrigatório</Form.Text>
          </Form.Group>
          <Form.Group controlId="veiculo_financiado">
            <Form.Label>Veículo é financiado?</Form.Label>
            <Form.Control as="select" name="veiculo_financiado" required>
              <option value="">(Selecione)</option>
              <option value="sim">Sim</option>
              <option value="nao">Não</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="dispositivo_antifurto">
            <Form.Label>Dispositivo Antifurto</Form.Label>
            <Form.Control as="select" name="dispositivo_antifurto" required>
              <option value="">(Selecione)</option>
              <option value="nao_possui">Não Possui</option>
              <option value="alarme">Alarme Sonoro</option>
              <option value="chave_codificada">Chave Codificada</option>
              <option value="sacar">Sacar</option>
              <option value="outro">Outro</option>
            </Form.Control>
          </Form.Group>
        </Card.Body>
      </Card>
    </>
  );
};

export default SeguroAutomotivo;

//@ts-nocheck

import React, { useState } from "react";

import { connect } from "react-redux";
import { Form, Button, Card } from "react-bootstrap";
import InputMask from "react-input-mask";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

import CartaoDeCredito from "./produtos/CartaoDeCredito";
import SeguroVida from "./produtos/SeguroVida";
import SeguroResidencial from "./produtos/SeguroResidencial";
import SeguroAutomotivo from "./produtos/SeguroAutomotivo";
import { Consorcio } from "./produtos/Consorcio";

import { PRODUTOS } from "../../constants/produtos";
import { PEDIDO_FIELDS, FIELDS } from "../../constants/fields";
import { createPedido } from "../../actions/pedido";
import { getFileNameFromPath } from "../../utils/fileUtils";
import PedidoAPI from "../../api/pedidoAPI";

import "./ProdutoPage.scss";

const ProdutoPage = (props: any) => {
  const produto = PRODUTOS[props.match.params.produtoId];

  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    if (isSubmitting) {
      return;
    }
    setIsSubmitting(true);

    let pedido_data = {};
    let produto_data = {};
    let files = [];

    for (const element of e.target.elements) {
      const type = element.type;
      if (type && type !== "submit") {
        const name = element.name;
        const value = element.value;
        if (PEDIDO_FIELDS.includes(name)) {
          pedido_data[name] = value;
        } else {
          if (["file", "checkbox", "radio"].includes(type)) {
            if (type === "file") {
              const file = element.files[0];
              if (file) {
                const nome_arquivo = getFileNameFromPath(value);
                files.push({ nome_arquivo, file, produto_key: name });
                produto_data[`${name}__file__`] = {
                  nome_arquivo,
                };
              }
            } else if (type === "checkbox") {
              if (!produto_data[name]) {
                produto_data[name] = [];
              }
              if (element.checked) {
                produto_data[name].push(value);
              }
            } else if (type === "radio" && element.checked) {
              produto_data[name] = value;
            }
          } else {
            produto_data[name] = value;
          }
        }
      }
    }

    const uploadFiles = (pedido) => {
      files.forEach(async (file_data) => {
        await PedidoAPI.sendPedidoArquivo(
          pedido,
          props.usuario,
          file_data.produto_key,
          file_data.nome_arquivo,
          file_data.file,
        );
      });

      return pedido;
    };

    const newPedidoPromise = props.createPedido(
      produto,
      props.usuario,
      pedido_data,
      produto_data,
    );
    if (files.length) {
      newPedidoPromise.then(uploadFiles);
    }
    newPedidoPromise
      .then((pedido) => {
        toast.success(
          <div>
            Novo pedido de {produto.nome} criado com sucesso!
            <Button
              as={Link}
              to={`/pedidos/${pedido.eid}`}
              variant="primary"
              block
            >
              <span className="label">Abrir Pedido</span>
            </Button>
          </div>,
        );
        props.history.push("/");
      })
      .catch((error) => {
        toast.error(<div>Erro na criação do pedido.</div>);
        setIsSubmitting(false);
      });
  };

  const ProductForm = {
    "cartao-de-credito": CartaoDeCredito,
    "seguro-vida": SeguroVida,
    "seguro-residencial": SeguroResidencial,
    "seguro-automotivo": SeguroAutomotivo,
    consorcio: Consorcio,
  }[produto.id];

  ///
  const [nomeCompleto, setNomeCompleto] = useState("");
  const onNomeCompletoChange = (e) => {
    setNomeCompleto(e.target.value);
  };
  //
  const [cpf, setCpf] = useState("");
  const onCpfChange = (e) => {
    setCpf(e.target.value);
  };
  ///

  return (
    <div className="produto-page">
      <h1>Novo pedido - {produto.nome}</h1>
      <Form onSubmit={onSubmit}>
        <Card>
          <Card.Header>Dados básicos</Card.Header>
          <Card.Body>
            <Form.Group controlId="nome_completo">
              <Form.Label>Nome Completo</Form.Label>
              <Form.Control
                name="nome_completo"
                type="text"
                required
                value={nomeCompleto}
                onChange={onNomeCompletoChange}
              />
            </Form.Group>
            <Form.Group controlId="cpf">
              <Form.Label>CPF</Form.Label>
              <InputMask
                mask={FIELDS.cpf.mask}
                value={cpf}
                onChange={onCpfChange}
              >
                {() => (
                  <Form.Control
                    name="cpf"
                    type="text"
                    placeholder={FIELDS.cpf.placeholder}
                    inputMode="numeric"
                    pattern={FIELDS.cpf.pattern}
                    required
                  />
                )}
              </InputMask>
              <Form.Text className="text-muted">Somente números</Form.Text>
            </Form.Group>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control name="email" type="email" required />
            </Form.Group>
            <Form.Group controlId="telefone_celular">
              <Form.Label>Telefone Celular</Form.Label>
              <InputMask mask={FIELDS.telefone_celular.mask}>
                {() => (
                  <Form.Control
                    name="telefone_celular"
                    type="text"
                    placeholder={FIELDS.telefone_celular.placeholder}
                    inputMode="numeric"
                    pattern={FIELDS.telefone_celular.pattern}
                    required
                  />
                )}
              </InputMask>
              <Form.Text className="text-muted">Somente números</Form.Text>
            </Form.Group>
          </Card.Body>
        </Card>
        <ProductForm nomeCompleto={nomeCompleto} cpf={cpf} />
        <Card>
          <Card.Header>Observações</Card.Header>
          <Card.Body>
            <Form.Group controlId="observacoes">
              <Form.Control name="observacoes" as="textarea" />
            </Form.Group>
          </Card.Body>
        </Card>

        <Button
          variant="primary"
          type="submit"
          block
          size="lg"
          className="btn-criar-pedido"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Criando Pedido..." : "Criar Novo Pedido"}
        </Button>
      </Form>
    </div>
  );
};
const mapStateToProps = (state) => ({
  usuario: state.usuario.usuario,
});
const mapDispatchToProps = {
  createPedido,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProdutoPage);

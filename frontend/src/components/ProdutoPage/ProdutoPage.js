import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Form, Button, Card } from "react-bootstrap";
import InputMask from "react-input-mask";
import { toast } from "react-toastify";

import CartaoDeCredito from "./produtos/CartaoDeCredito";
import SeguroVida from "./produtos/SeguroVida";

import { PRODUTOS } from "../../constants/produtos";
import { PEDIDO_FIELDS, FIELDS } from "../../constants/fields";
import { createPedido } from "../../actions/pedido";

import "./ProdutoPage.scss";
import { Link } from "react-router-dom";

class ProdutoPage extends Component {
  static propTypes = {
    usuario: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      produto: PRODUTOS[this.props.match.params.produtoId],
    };
  }

  onSubmit = (e) => {
    e.preventDefault();

    let pedido_data = {};
    let produto_data = {};
    Object.entries(e.target.elements).forEach(([_, element]) => {
      if (element.type !== "submit") {
        const name = element.name;
        const value = element.value;

        if (PEDIDO_FIELDS.includes(name)) {
          pedido_data[name] = value;
        } else if (element.type != "radio" || element.checked) {
          produto_data[name] = value;
        }
      }
    });

    this.props
      .createPedido(
        this.state.produto,
        this.props.usuario,
        pedido_data,
        produto_data,
      )
      .then((pedido) => {
        toast.success(
          <div>
            Novo pedido de {this.state.produto.nome} criado com sucesso!
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
        this.props.history.push("/");
      });
  };

  render() {
    const ProductForm = {
      "cartao-de-credito": CartaoDeCredito,
      "seguro-vida": SeguroVida,
    }[this.state.produto.id];

    return (
      <div className="produto-page">
        <h1>Novo pedido - {this.state.produto.nome}</h1>
        <Form onSubmit={this.onSubmit}>
          <Card>
            <Card.Header>Dados básicos</Card.Header>
            <Card.Body>
              <Form.Group controlId="nome_completo">
                <Form.Label>Nome Completo</Form.Label>
                <Form.Control name="nome_completo" type="text" required />
              </Form.Group>
              <Form.Group controlId="cpf">
                <Form.Label>CPF</Form.Label>
                <InputMask mask={FIELDS.cpf.mask}>
                  {() => (
                    <Form.Control
                      name="cpf"
                      type="text"
                      placeholder={FIELDS.cpf.placeholder}
                      inputMode="numeric"
                      pattern={FIELDS.cpf.pattern}
                      required={true}
                    />
                  )}
                </InputMask>
                <Form.Text className="text-muted">Somente números</Form.Text>
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control name="email" type="email" required={true} />
              </Form.Group>
              <Form.Group controlId="telefone_celular">
                <Form.Label>Telefone Celular</Form.Label>
                <InputMask mask={FIELDS.telefone_celular.mask}>
                  {() => (
                    <Form.Control
                      name="telefone_celular"
                      type="text"
                      placeholder={FIELDS.telefone_celular.placeholderZ}
                      inputMode="numeric"
                      pattern={FIELDS.telefone_celular.pattern}
                      required={true}
                    />
                  )}
                </InputMask>
                <Form.Text className="text-muted">Somente números</Form.Text>
              </Form.Group>
            </Card.Body>
          </Card>
          <ProductForm />
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
          >
            Criar Novo Pedido
          </Button>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  usuario: state.usuario.usuario,
});
const mapDispatchToProps = {
  createPedido,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProdutoPage);

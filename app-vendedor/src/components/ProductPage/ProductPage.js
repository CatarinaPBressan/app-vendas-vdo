import React, { Component } from 'react';

import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Form, Button, Card } from 'react-bootstrap';
import InputMask from 'react-input-mask';

import Navbar from '../common/Navbar';

import './ProductPage.scss';
import { getProduct } from '../../utils/getProduct';
import CreditCardForm from '../products/CreditCardForm';
import { FIELDS } from '../../constants/fields';
import { createPedido } from '../../actions/pedido';

class ProductPage extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    match: PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      product: getProduct(props.match.params.productId),
    };
  }

  getProductForm = () => {
    return {
      'cartao-de-credito': <CreditCardForm />,
    }[this.state.product.id];
  };

  onSubmit = (e) => {
    e.preventDefault();
    let data = {};
    Object.entries(e.target.elements).forEach(([_, element]) => {
      if (element.type !== 'submit') {
        data[element.name] = element.value;
      }
    });
    console.log(data);
    this.props
      .createPedido(this.state.product, this.props.user, data)
      .then((pedido) => {
        console.log(pedido);
      });
  };

  render() {
    const productForm = this.getProductForm();
    return (
      <div className="product-page">
        <Navbar user={this.props.user} location={this.props.location} />
        <Container>
          <h1>Novo pedido - {this.state.product.name}</h1>
          <Form onSubmit={this.onSubmit}>
            <Card>
              <Card.Header>Dados básicos</Card.Header>
              <Card.Body>
                <Form.Group controlId="nome">
                  <Form.Label>Nome Completo</Form.Label>
                  <Form.Control name="nome" type="text" required />
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
            {productForm}
            <Card>
              <Card.Header>Observações</Card.Header>
              <Card.Body>
                <Form.Group controlId="observacoes">
                  <Form.Control name="observacoes" as="textarea" />
                </Form.Group>
              </Card.Body>
            </Card>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Container>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  user: state.account.user,
});
const mapDispatchToProps = {
  createPedido,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductPage);

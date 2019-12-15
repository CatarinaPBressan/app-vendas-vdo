import React, { Component } from "react";
import { PropTypes } from "prop-types";

import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";

import { fetchUser } from "../actions/account";

export class LoginPage extends Component {
  static propTypes = {
    fetchUser: PropTypes.func.isRequired
  };

  render() {
    return (
      <div className="login-page">
        <div className="login-box">
          <Form>
            <Form.Group controlId="username">
              <Form.Label>CPF/CNPJ</Form.Label>
              <Form.Control
                type="text"
                placeholder="(Somente números)"
                required
              />
            </Form.Group>

            <Form.Group controlId="password">
              <Form.Label>Senha</Form.Label>
              <Form.Control type="password" required />
            </Form.Group>
            <Button variant="primary" type="submit">
              Entrar
            </Button>
          </Form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.account.user
});
const mapDispatchToProps = {
  fetchUser
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

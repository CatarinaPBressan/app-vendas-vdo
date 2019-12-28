import React, { Component } from "react";
import { PropTypes } from "prop-types";

import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";
import InputMask from "react-input-mask";

import { fetchUser } from "../actions/account";

const CPF_MASK = "999.999.999-99";
const CNPJ_MASK = "99.999.999/9999-99";

const MASKS = {
  cpf: CPF_MASK,
  cnpj: CNPJ_MASK
};

export class LoginPage extends Component {
  static propTypes = {
    fetchUser: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    const loginWith = "cpf";
    this.state = {
      usernameMask: MASKS[loginWith],
      username: null,
      loginWith: loginWith
    };
  }

  onLoginChoiceChanged = event => {
    const loginWith = event.target.value;
    this.setState({
      loginWith,
      usernameMask: MASKS[loginWith]
    });
  };

  render() {
    return (
      <div className="login-page">
        <div className="login-box">
          <Form>
            <Form.Group>
              <Form.Label htmlFor="usuario">
                <b>Usuário:</b>
              </Form.Label>
              <Form.Check
                label="CPF"
                type="radio"
                value="cpf"
                name="username-type"
                checked={this.state.loginWith === "cpf"}
                onChange={this.onLoginChoiceChanged}
                id="username-type-cpf"
              />
              <Form.Check
                label="CNPJ"
                type="radio"
                value="cnpj"
                name="username-type"
                checked={this.state.loginWith === "cnpj"}
                onChange={this.onLoginChoiceChanged}
                id="username-type-cnpj"
              />
            </Form.Group>
            <Form.Group controlId="usuario">
              <InputMask mask={this.state.usernameMask}>
                {() => (
                  <Form.Control
                    type="text"
                    inputmode="numeric"
                    required
                    size="lg"
                  />
                )}
              </InputMask>
            </Form.Group>

            <Form.Group controlId="senha">
              <Form.Label>
                <b>Senha:</b>
              </Form.Label>
              <Form.Control type="password" required size="lg" />
            </Form.Group>
            <Button variant="primary" type="submit" size="lg" block>
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

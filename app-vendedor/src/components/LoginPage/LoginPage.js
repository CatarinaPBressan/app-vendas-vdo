import React, { Component } from "react";
import { PropTypes } from "prop-types";

import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";

import { login } from "../../actions/usuario";

import "./LoginPage.scss";

export class LoginPage extends Component {
  static propTypes = {
    login: PropTypes.func.isRequired,
  };

  onSubmit = (e) => {
    e.preventDefault();
    const username = e.target.elements.username.value;
    const password = e.target.elements.password.value;
    this.props.login(username, password);
  };

  render() {
    return (
      <div className="login-page">
        <div className="login-box">
          <Form onSubmit={this.onSubmit}>
            <Form.Group controlId="username">
              <Form.Label>
                <b>Usuário:</b>
              </Form.Label>
              <Form.Control type="text" required size="lg" />
            </Form.Group>
            <Form.Group controlId="password">
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

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
  login: login,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

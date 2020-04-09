import React from "react";

import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { toast } from "react-toastify";

import { login } from "../../actions/usuario";

import "./LoginPage.scss";

const LoginPage = ({ login }) => {
  const onSubmit = async (e) => {
    e.preventDefault();
    const usuario = await login(
      e.target.elements.username.value,
      e.target.elements.password.value,
    );
    if (usuario) {
      toast.dismiss();
    } else {
      toast.error("Usuário ou senha incorretos.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <Form onSubmit={onSubmit}>
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
};

const mapStateToProps = (state) => ({});
const mapDispatchToProps = {
  login: login,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import _ from "lodash";
import { Form, Card, Col, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

import { FileDownloadButton } from "./FileDownloadButton";
import { UploadCotacaoButton } from "./UploadCotacaoButton";
import CartaoDeCredito from "./produtos/CartaoDeCredito";
import PedidoActionButtons from "./PedidoActionButtons";
import SeguroAutomotivo from "./produtos/SeguroAutomotivo";
import SeguroResidencial from "./produtos/SeguroResidencial";
import SeguroVida from "./produtos/SeguroVida";

import { fetchPedidoProduto } from "../../actions/pedido";
import { PEDIDO_STATUS_LABELS } from "../../constants/pedidos";
import { PRODUTOS, TIPOS_PRODUTO } from "../../constants/produtos";

import "./PedidoDisplay.scss";

const PedidoDisplay = ({
  pedidos,
  match: {
    params: { pedidoEid },
  },
  fetchPedidoProduto,
  usuario,
}) => {
  const [pedido, setPedido] = useState();
  const [ProdutoDisplay, setProdutoDisplay] = useState();
  useEffect(() => {
    const loadPedido = async () => {
      if (_.isEmpty(pedidos)) {
        return;
      }
      const _pedido = pedidos[pedidoEid];
      const produtoDisplay = {
        "cartao-de-credito": CartaoDeCredito,
        "seguro-vida": SeguroVida,
        "seguro-residencial": SeguroResidencial,
        "seguro-automotivo": SeguroAutomotivo,
      }[_pedido.produto_slug];
      setPedido(_pedido);
      setProdutoDisplay(() => produtoDisplay);
      if (!_pedido.produto) {
        await fetchPedidoProduto(_pedido, usuario);
      }
    };
    loadPedido();
  }, [pedidos, pedidoEid, fetchPedidoProduto, usuario]);

  if (!pedido) {
    return (
      <div className="pedido-display">
        <Button
          as={Link}
          to="/pedidos"
          className="backbutton"
          variant="outline-secondary"
          size="lg"
          block
        >
          <FontAwesomeIcon icon="chevron-left" />
          <span className="label">Voltar</span>
        </Button>
        <div> Carregando pedido... </div>
      </div>
    );
  }
  return (
    <div className="pedido-display">
      <Button
        as={Link}
        to="/pedidos"
        className="backbutton"
        variant="outline-secondary"
        size="lg"
        block
      >
        <FontAwesomeIcon icon="chevron-left" />
        <span className="label">Voltar</span>
      </Button>

      {usuario.permissoes.includes("backoffice") && (
        <Card className="pedido-actions-card">
          <Card.Header>
            <b>Pedido:</b> {pedido.eid}
          </Card.Header>
          <Card.Body>
            <div className="status-container">
              <b>Situação:</b> {PEDIDO_STATUS_LABELS[pedido.status]}
            </div>
            <PedidoActionButtons pedido={pedido} usuario={usuario} />
          </Card.Body>
        </Card>
      )}
      <Card>
        <Card.Header>Dados do Vendedor</Card.Header>
        <Card.Body>
          <Form.Row>
            <Form.Group controlId="nome_vendedor" as={Col} lg={9}>
              <Form.Label>Nome</Form.Label>
              <Form.Control plaintext readOnly value={pedido.usuario.nome} />
            </Form.Group>
            <Form.Group controlId="cpf_vendedor" as={Col} lg={3}>
              <Form.Label>CPF</Form.Label>
              <Form.Control plaintext readOnly value={pedido.usuario.cpf} />
            </Form.Group>
          </Form.Row>
        </Card.Body>
      </Card>

      <Card>
        <Card.Header>Dados básicos</Card.Header>
        <Card.Body>
          <Form.Row>
            <Form.Group controlId="nome" as={Col} lg={8}>
              <Form.Label>Nome Completo</Form.Label>
              <Form.Control plaintext readOnly value={pedido.nome_completo} />
            </Form.Group>
            <Form.Group controlId="cpf" as={Col}>
              <Form.Label>CPF</Form.Label>
              <Form.Control plaintext readOnly value={pedido.cpf} />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Form.Group controlId="email" as={Col} lg={8}>
              <Form.Label>Email</Form.Label>
              <Form.Control plaintext readOnly value={pedido.email} />
            </Form.Group>
            <Form.Group controlId="telefone_celular" as={Col}>
              <Form.Label>Telefone Celular</Form.Label>
              <Form.Control
                plaintext
                readOnly
                value={pedido.telefone_celular}
              />
            </Form.Group>
          </Form.Row>
        </Card.Body>
      </Card>
      {pedido.produto ? (
        <>
          <ProdutoDisplay data={pedido.produto} usuario={usuario} />
          {PRODUTOS[pedido.produto_slug].tipo_produto ===
            TIPOS_PRODUTO.seguro && (
            <Card>
              <Card.Header>Cotação</Card.Header>
              <Card.Body>
                {pedido.arquivo_cotacao_url ? (
                  <div>
                    <FileDownloadButton
                      usuario={usuario}
                      fileURL={pedido.arquivo_cotacao_url}
                      label="Download cotação"
                    />
                  </div>
                ) : (
                  <div>
                    <UploadCotacaoButton pedido={pedido} usuario={usuario} />
                  </div>
                )}
              </Card.Body>
            </Card>
          )}
        </>
      ) : (
        <div>Carregando dados</div>
      )}

      <Card>
        <Card.Header>Observações</Card.Header>
        <Card.Body>
          <Form.Group controlId="observacoes">
            <Form.Control
              name="observacoes"
              as="textarea"
              disabled
              value={pedido.observacoes}
            />
          </Form.Group>
        </Card.Body>
      </Card>
      <Button
        as={Link}
        to="/pedidos"
        className="backbutton"
        variant="outline-secondary"
        size="lg"
        block
      >
        <FontAwesomeIcon icon="chevron-left" />
        <span className="label">Voltar</span>
      </Button>
    </div>
  );
};

const mapStateToProps = (state) => ({
  pedidos: state.pedido.pedidos,
  usuario: state.usuario.usuario,
});

const mapDispatchToProps = {
  fetchPedidoProduto,
};

export default connect(mapStateToProps, mapDispatchToProps)(PedidoDisplay);

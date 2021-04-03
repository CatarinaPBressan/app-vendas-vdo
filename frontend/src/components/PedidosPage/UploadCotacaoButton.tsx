//@ts-nocheck

import React, { useState } from "react";

import { connect } from "react-redux";
import { Form, Button, Col } from "react-bootstrap";

import { uploadPedidoArquivo } from "../../actions/pedido";
import { getFileNameFromPath } from "../../utils/fileUtils";

const _UploadCotacaoButton = ({ pedido, usuario, uploadPedidoArquivo }) => {
  const [isUploadingCotacao, setIsUploadingCotacao] = useState(false);
  const [cotacaoUploadLabel, setCotacaoUploadLabel] = useState("Cotação");
  const [hasFileChanged, setHasFileChanged] = useState(false);
  const onCotacaoFileChange = (e) => {
    setHasFileChanged(true);
    setCotacaoUploadLabel(getFileNameFromPath(e.target.value));
  };

  return (
    <>
      {usuario.permissoes.includes("backoffice") ? (
        <Form
          onSubmit={async (e) => {
            e.preventDefault();

            if (isUploadingCotacao) {
              return;
            }
            setIsUploadingCotacao(true);

            const file = e.target.elements.upload_cotacao.files[0];
            if (file) {
              const fileName = getFileNameFromPath(
                e.target.elements.upload_cotacao.value,
              );
              await uploadPedidoArquivo(
                pedido,
                usuario,
                "cotacao",
                fileName,
                file,
              );
            }
            setIsUploadingCotacao(false);
          }}
        >
          <Form.Row>
            <Form.Group controlId="upload_cotacao" as={Col}>
              <Form.Label>Cotação</Form.Label>
              <Form.File
                name="upload_cotacao"
                custom
                onChange={onCotacaoFileChange}
                label={cotacaoUploadLabel}
                data-browse="Selecionar Arquivo..."
              />
            </Form.Group>
          </Form.Row>
          <Form.Row>
            <Col lg={8}></Col>
            <Col lg={4}>
              <Button
                variant="primary"
                type="submit"
                size="md"
                className="btn-criar-pedido"
                disabled={isUploadingCotacao || !hasFileChanged}
                block
              >
                {isUploadingCotacao
                  ? "Fazendo upload da cotação..."
                  : "Fazer upload da cotação"}
              </Button>
            </Col>
          </Form.Row>
        </Form>
      ) : (
        <div>Cotação indisponível</div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  uploadPedidoArquivo,
};

export const UploadCotacaoButton = connect(
  mapStateToProps,
  mapDispatchToProps,
)(_UploadCotacaoButton);

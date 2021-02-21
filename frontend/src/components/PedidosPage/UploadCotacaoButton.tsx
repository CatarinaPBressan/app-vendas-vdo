//@ts-nocheck

import React, { useState } from "react";

import { connect } from "react-redux";
import { Form, Button } from "react-bootstrap";

import { uploadPedidoArquivo } from "../../actions/pedido";
import { getFileNameFromPath } from "../../utils/utils";

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
        // Criar componente de upload
        <Form
          onSubmit={async (e) => {
            e.preventDefault();

            if (isUploadingCotacao) {
              return;
            }
            setIsUploadingCotacao(true);

            const file = e.target.elements.upload_cotacao.files[0];
            console.log(file);
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
          <Form.Group controlId="upload_cotacao">
            <Form.Label>Cotação</Form.Label>
            <Form.File
              name="upload_cotacao"
              custom
              onChange={onCotacaoFileChange}
              label={cotacaoUploadLabel}
            />
          </Form.Group>
          <Button
            variant="primary"
            type="submit"
            block
            size="lg"
            className="btn-criar-pedido"
            disabled={isUploadingCotacao || !hasFileChanged}
          >
            {isUploadingCotacao
              ? "Fazendo upload da cotação..."
              : "Fazer upload da cotação"}
          </Button>
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

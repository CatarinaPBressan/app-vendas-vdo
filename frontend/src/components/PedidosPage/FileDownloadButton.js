import React from "react";

import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import PedidoAPI from "../../api/pedidoAPI";

export const FileDownloadButton = ({ usuario, fileData }) => {
  if (!fileData) {
    return (
      <Button disabled variant="outline-dark">
        Upload de arquivos pela tela de pedidos não disponível
      </Button>
    );
  }
  return (
    <a
      href={fileData.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => {
        e.preventDefault();

        PedidoAPI.getPedidoArquivo(
          fileData.url,
          usuario,
          fileData.nome_arquivo,
        );
      }}
    >
      <Button variant="outline-primary">
        {fileData.nome_arquivo} <FontAwesomeIcon icon="cloud-download-alt" />
      </Button>
    </a>
  );
};

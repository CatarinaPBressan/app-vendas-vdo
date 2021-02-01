import React from "react";

import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const FileDownloadButton = ({ usuario, fileData }) => {
  if (!fileData) {
    return (
      <Button disabled variant="outline-dark">
        Upload de arquivos pela tela de pedidos não disponível
      </Button>
    );
  }

  const fileURL = new URL(fileData.url);
  fileURL.searchParams.append("token", usuario.token);
  return (
    <a href={fileURL}>
      <Button variant="outline-primary">
        {fileData.nome_arquivo} <FontAwesomeIcon icon="cloud-download-alt" />
      </Button>
    </a>
  );
};

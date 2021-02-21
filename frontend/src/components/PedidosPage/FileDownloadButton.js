import React from "react";

import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const FileDownloadButton = ({ usuario, fileData, fileURL, label }) => {
  if (!fileData && !fileURL) {
    return (
      <Button disabled variant="outline-dark">
        Upload de arquivos pela tela de pedidos não disponível
      </Button>
    );
  }

  let _fileURL = null;
  if (fileData) {
    _fileURL = new URL(fileData.url);
  } else {
    _fileURL = new URL(fileURL);
  }
  _fileURL.searchParams.append("token", usuario.token);

  return (
    <a href={_fileURL}>
      <Button variant="outline-primary">
        {fileData ? fileData.nome_arquivo : label}{" "}
        <FontAwesomeIcon icon="cloud-download-alt" />
      </Button>
    </a>
  );
};

import React from "react";

import { Button } from "react-bootstrap";

export const PedidoActionButtons = ({ pedido }) => {
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {pedido.status == "novo" && (
        <Button size="md" variant="success">
          Iniciar
        </Button>
      )}
      {pedido.status == "analise_credito" && (
        <>
          <Button size="md" variant="success">
            Aprovar
          </Button>
          <Button size="md" variant="danger">
            Reprovar
          </Button>
        </>
      )}
      {pedido.status == "em_andamento" && (
        <Button size="md" variant="success">
          Completar
        </Button>
      )}
      {!["completo", "cancelado"].includes(pedido.status) && (
        <Button size="md" variant="danger">
          Cancelar
        </Button>
      )}
    </div>
  );
};

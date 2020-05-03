import React from "react";

import { Button } from "react-bootstrap";

import { updatePedidoStatus } from "../../actions/pedido";
import { connect } from "react-redux";

export const PedidoActionButtons = ({
  pedido,
  usuario,
  updatePedidoStatus,
}) => {
  const _updatePedidoStatus = (transicao) => () =>
    updatePedidoStatus(pedido, usuario, transicao);

  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      {pedido.status === "novo" && (
        <Button
          size="md"
          variant="success"
          onClick={_updatePedidoStatus("iniciar")}
        >
          Iniciar
        </Button>
      )}
      {pedido.status === "analise_credito" && (
        <>
          <Button size="md" variant="success">
            Aprovar
          </Button>
          <Button size="md" variant="danger">
            Reprovar
          </Button>
        </>
      )}
      {pedido.status === "em_andamento" && (
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

const mapDispatchToProps = {
  updatePedidoStatus,
};

export default connect(() => ({}), mapDispatchToProps)(PedidoActionButtons);

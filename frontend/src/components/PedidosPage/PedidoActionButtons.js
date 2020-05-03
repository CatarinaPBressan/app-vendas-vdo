import React from "react";

import { Button } from "react-bootstrap";
import { connect } from "react-redux";

import { PEDIDO_STATUS, PEDIDO_TRANSICOES } from "../../constants/pedidos";
import { updatePedidoStatus } from "../../actions/pedido";

import "./PedidoActionButtons.scss";

export const PedidoActionButtons = ({
  pedido,
  usuario,
  updatePedidoStatus,
}) => {
  const _updatePedidoStatus = (transicao) => () =>
    updatePedidoStatus(pedido, usuario, transicao);

  return (
    <div className="pedido-action-button-container">
      {pedido.status === PEDIDO_STATUS.NOVO && (
        <Button
          size="md"
          variant="success"
          onClick={_updatePedidoStatus(PEDIDO_TRANSICOES.INICIAR)}
        >
          Iniciar
        </Button>
      )}
      {pedido.status === PEDIDO_STATUS.ANALISE_CREDITO && (
        <div>
          <Button
            size="md"
            variant="success"
            className="aprovar-analise-btn"
            onClick={_updatePedidoStatus(PEDIDO_TRANSICOES.APROVAR)}
          >
            Aprovar
          </Button>
          <Button
            size="md"
            variant="danger"
            onClick={_updatePedidoStatus(PEDIDO_TRANSICOES.REPROVAR)}
          >
            Reprovar
          </Button>
        </div>
      )}
      {pedido.status === PEDIDO_STATUS.EM_ANDAMENTO && (
        <Button
          size="md"
          variant="success"
          onClick={_updatePedidoStatus(PEDIDO_TRANSICOES.COMPLETAR)}
        >
          Completar
        </Button>
      )}
      {![
        PEDIDO_STATUS.COMPLETO,
        PEDIDO_STATUS.CANCELADO,
        PEDIDO_STATUS.REPROVADO,
      ].includes(pedido.status) && (
        <Button
          size="md"
          variant="outline-danger"
          onClick={_updatePedidoStatus(PEDIDO_TRANSICOES.CANCELAR)}
        >
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

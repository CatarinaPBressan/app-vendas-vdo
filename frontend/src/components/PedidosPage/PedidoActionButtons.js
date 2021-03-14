import React from "react";

import { Button } from "react-bootstrap";
import { connect } from "react-redux";

import {
  PEDIDO_STATUS,
  PEDIDO_TRANSICOES,
  MAPA_PRODUTO_TRANSICOES,
} from "../../constants/pedidoStatus";
import { updatePedidoStatus } from "../../actions/pedido";

import "./PedidoActionButtons.scss";
import { PRODUTOS } from "../../constants/produtos";

export const PedidoActionButtons = ({
  pedido,
  usuario,
  updatePedidoStatus,
}) => {
  const _updatePedidoStatus = (transicao) => () =>
    updatePedidoStatus(pedido, usuario, transicao);
  const produto = PRODUTOS[pedido.produto_slug];
  const transicoes_estado =
    MAPA_PRODUTO_TRANSICOES[produto.tipo_produto][pedido.status];

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
      <div>
        {transicoes_estado &&
          transicoes_estado.map(({ label, variant, transicao }) => (
            <Button
              size="md"
              variant={variant}
              onClick={_updatePedidoStatus(transicao)}
              className="pedido-status-btn"
              key={transicao}
            >
              {label}
            </Button>
          ))}
      </div>
      {![PEDIDO_STATUS.CANCELADO, PEDIDO_STATUS.COMPLETO].includes(
        pedido.status,
      ) && (
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

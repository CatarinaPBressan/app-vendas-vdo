import { createAction } from '@reduxjs/toolkit';

import PedidoAPI from '../api/pedidoAPI';

export const appendPedido = createAction('pedido/pedido/set');

export const createPedido = (produto, usuario, data) => (dispatch) => {
  return PedidoAPI.create(produto, usuario, data).then((pedido) => {
    dispatch(appendPedido(pedido));
    return pedido;
  });
};

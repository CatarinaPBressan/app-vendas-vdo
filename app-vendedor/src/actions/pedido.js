import { createAction } from '@reduxjs/toolkit';

import PedidoAPI from '../api/pedidoAPI';

export const appendPedido = createAction('pedido/pedido/set');

export const createPedido = (product, user, data) => (dispatch) => {
  return PedidoAPI.create(product, user, data).then((pedido) => {
    dispatch(appendPedido(pedido));
    return pedido;
  });
};

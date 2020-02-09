import { createAction } from '@reduxjs/toolkit';

import PedidoAPI from '../api/pedidoAPI';

export const setPedido = createAction('pedido/pedido/set');

export const createPedido = (product, user, data) => (dispatch) => {
  return PedidoAPI.create(product, user, data).then((pedido) => {
    dispatch(setPedido(pedido));
    return pedido;
  });
};

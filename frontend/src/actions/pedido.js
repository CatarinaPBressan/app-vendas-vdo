import { createAction } from "@reduxjs/toolkit";

import PedidoAPI from "../api/pedidoAPI";

export const addPedido = createAction("pedido/pedido/append");
export const setPedidos = createAction("pedido/pedidos/set");

export const fetchPedidos = (usuario) => (dispatch) => {
  return PedidoAPI.fetchPedidos(usuario).then((pedidos) => {
    dispatch(setPedidos(pedidos));
  });
};

export const fetchPedidoProduto = (pedido, usuario) => (dispatch) => {
  return PedidoAPI.fetchPedidoProduto(pedido, usuario).then((pedido) => {
    dispatch(addPedido(pedido));
  });
};

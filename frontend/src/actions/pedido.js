import { createAction } from "@reduxjs/toolkit";

import PedidoAPI from "../api/pedidoAPI";

export const addPedido = createAction("pedido/pedido/append");
export const setPedidos = createAction("pedido/pedidos/set");
export const clearPedidos = createAction("pedido/pedidos/clear");

export const createPedido = (
  produto,
  usuario,
  pedido_data,
  produto_data,
) => async (dispatch) => {
  const pedido = await PedidoAPI.create(
    produto,
    usuario,
    pedido_data,
    produto_data,
  );
  dispatch(addPedido(pedido));
  return pedido;
};

export const fetchPedidos = (usuario) => async (dispatch) => {
  const pedidos = await PedidoAPI.fetchPedidos(usuario);
  dispatch(setPedidos(pedidos));
  return pedidos;
};

export const fetchPedidoProduto = (pedido, usuario) => async (dispatch) => {
  const pedidoComProduto = await PedidoAPI.fetchPedidoProduto(pedido, usuario);
  dispatch(addPedido(pedidoComProduto));
  return pedidoComProduto;
};

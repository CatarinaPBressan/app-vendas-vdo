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
  const _pedido = await PedidoAPI.fetchPedidoProduto(pedido, usuario);
  dispatch(addPedido(_pedido));
  return _pedido;
};

export const updatePedidoStatus = (pedido, usuario, transicao) => async (
  dispatch,
) => {
  const _pedido = await PedidoAPI.updatePedidoStatus(
    pedido,
    usuario,
    transicao,
  );
  dispatch(addPedido(_pedido));
  return _pedido;
};

export const uploadPedidoArquivo = (
  pedido,
  usuario,
  produto_key,
  nome_arquivo,
  file,
) => async (dispatch) => {
  const _pedido = await PedidoAPI.sendPedidoArquivo(
    pedido,
    usuario,
    produto_key,
    nome_arquivo,
    file,
  );
  dispatch(addPedido(_pedido));
  return _pedido;
};

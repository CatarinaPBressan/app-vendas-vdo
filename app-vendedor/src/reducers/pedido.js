import { createReducer } from "@reduxjs/toolkit";

import { addPedido, setPedidos } from "../actions/pedido";

const initialState = {
  pedidos: {},
};

const _setPedido = (state, pedido) => {
  state.pedidos[pedido.eid] = pedido;
};

export default createReducer(initialState, {
  [addPedido]: (state, { payload }) => {
    _setPedido(state, payload);
  },

  [setPedidos]: (state, { payload }) => {
    payload.forEach((pedido) => {
      _setPedido(state, pedido);
    });
  },
});

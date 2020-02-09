import { createReducer } from '@reduxjs/toolkit';

import { setPedido } from '../actions/pedido';

const initialState = {
  pedidos: {},
};

export default createReducer(initialState, {
  [setPedido]: (state, { payload }) => {
    state.pedidos[payload.eid] = payload;
  },
});

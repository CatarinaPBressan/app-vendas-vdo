import { createReducer } from '@reduxjs/toolkit';

import { setUsuario } from '../actions/usuario';

const initialState = {
  usuario: null,
};

export default createReducer(initialState, {
  [setUsuario]: (state, { payload }) => {
    state.usuario = payload;
  },
});

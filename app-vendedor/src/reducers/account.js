import { createReducer } from '@reduxjs/toolkit';

import { setUser } from '../actions/account';

const initialState = {
  user: null,
};

export default createReducer(initialState, {
  [setUser]: (state, { payload }) => {
    state.user = payload;
  },
});

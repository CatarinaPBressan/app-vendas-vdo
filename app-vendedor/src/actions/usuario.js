import { createAction } from '@reduxjs/toolkit';

import UsuarioAPI from '../api/usuarioAPI';

export const setUsuario = createAction('usuario/usuario/set');

export const fetchUsuario = (username, password) => (dispatch) => {
  return UsuarioAPI.fetchUsuario(username, password).then((usuario) => {
    dispatch(setUsuario(usuario));
  });
};

export const clearUsuario = () => (dispatch) => {
  dispatch(setUsuario(null));
};

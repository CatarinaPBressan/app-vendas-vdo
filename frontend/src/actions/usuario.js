import { createAction } from "@reduxjs/toolkit";

import UsuarioAPI from "../api/usuarioAPI";

export const setUsuario = createAction("usuario/usuario/set");

export const login = (username, password) => async (dispatch) => {
  const usuario = await UsuarioAPI.login(username, password);
  if (usuario) {
    localStorage.setItem("token", usuario.token);
    dispatch(setUsuario(usuario));
  }
  return usuario;
};

export const getUsuario = (token) => async (dispatch) => {
  const usuario = await UsuarioAPI.getUsuario(token);
  dispatch(setUsuario(usuario));
  return usuario;
};

export const clearUsuario = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch(setUsuario(null));
};

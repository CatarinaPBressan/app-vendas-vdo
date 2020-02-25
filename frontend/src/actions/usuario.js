import { createAction } from "@reduxjs/toolkit";

import UsuarioAPI from "../api/usuarioAPI";

export const setUsuario = createAction("usuario/usuario/set");

export const login = (username, password) => (dispatch) => {
  return UsuarioAPI.login(username, password).then((usuario) => {
    localStorage.setItem("token", usuario.token);
    dispatch(setUsuario(usuario));
  });
};

export const getUsuario = (token) => (dispatch) => {
  return UsuarioAPI.getUsuario(token).then((usuario) => {
    dispatch(setUsuario(usuario));
    return usuario;
  });
};

export const clearUsuario = () => (dispatch) => {
  localStorage.removeItem("token");
  dispatch(setUsuario(null));
};

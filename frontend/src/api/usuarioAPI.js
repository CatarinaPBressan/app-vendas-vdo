import { v0Api } from "./utils";

const handleUnauthorized = (error) => {
  if (error.response && error.response.status === 401) {
    return null;
  }
  throw error;
};

const UsuarioAPI = {
  login: async (username, password) => {
    let response = null;
    try {
      response = await v0Api().post("usuarios/", { username, password });
    } catch (error) {
      return handleUnauthorized(error);
    }
    return response.data.usuario;
  },

  getUsuario: async (token) => {
    let response = null;
    try {
      response = await v0Api(token).get("usuarios/");
    } catch (error) {
      return handleUnauthorized(error);
    }
    return response.data.usuario;
  },
};

export default UsuarioAPI;

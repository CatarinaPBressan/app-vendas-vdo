import axios from "axios";
import { getHeaders } from "./utils";

const UsuarioAPI = {
  login: (username, password) => {
    return axios
      .post("/api/v0/usuarios/", {
        username: username,
        password: password,
      })
      .then((response) => {
        return response.data.usuario;
      });
  },

  getUsuario: (token) => {
    return axios
      .get("/api/v0/usuarios/", {
        headers: getHeaders(token),
      })
      .then((response) => {
        return response.data.usuario;
      })
      .catch((error) => {
        if (error.response && error.response.status === 401) {
          return null;
        }
      });
  },
};

export default UsuarioAPI;

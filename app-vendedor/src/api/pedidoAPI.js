import axios from "axios";

import { getHeaders } from "./utils";

function uuidv4() {
  // Crappy uuidv4 generator for testing purposes
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const PedidoAPI = {
  create: (produto, usuario, pedido_data, produto_data) => {
    console.log(pedido_data);
    console.log(produto_data);
    const data = {
      ...pedido_data,
      produto_slug: produto.id,
      produto: produto_data,
    };
    console.log(data);
    return axios
      .post("/api/v0/pedidos/", data, {
        headers: getHeaders(usuario.token),
      })
      .then((response) => {
        return response.data.pedido;
      });
  },

  fetchPedidos: (usuario) => {
    return axios
      .get("/api/v0/pedidos/", {
        headers: getHeaders(usuario.token),
      })
      .then((response) => {
        return response.data.pedidos;
      });
  },

  fetchPedidoProduto: (pedido, usuario) => {
    return axios
      .get(`/api/v0/pedidos/${pedido.eid}/`, {
        headers: getHeaders(usuario.token),
      })
      .then((response) => {
        return response.data.pedido;
      });
  },
};

export default PedidoAPI;

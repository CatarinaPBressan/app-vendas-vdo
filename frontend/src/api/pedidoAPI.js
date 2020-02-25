import axios from "axios";

import { getHeaders } from "./utils";

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
        params: {
          lista_pedidos: true,
        },
        headers: getHeaders(usuario.token),
      })
      .then((response) => {
        return response.data.pedidos;
      });
  },

  fetchPedidoProduto: (pedido, usuario) => {
    return axios
      .get(`/api/v0/pedidos/${pedido.eid}/`, {
        params: {
          lista_pedidos: true,
        },
        headers: getHeaders(usuario.token),
      })
      .then((response) => {
        return response.data.pedido;
      });
  },
};

export default PedidoAPI;

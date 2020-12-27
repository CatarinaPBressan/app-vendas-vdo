import fileDownload from "js-file-download";

import { v0Api } from "./utils";

const PedidoAPI = {
  create: async (produto, usuario, pedido_data, produto_data) => {
    const data = {
      ...pedido_data,
      produto_slug: produto.id,
      produto: produto_data,
    };
    const response = await v0Api(usuario.token).post("pedidos/", data);
    return response.data.pedido;
  },

  fetchPedidos: async (usuario) => {
    const response = await v0Api(usuario.token).get("pedidos/");
    return response.data.pedidos;
  },

  fetchPedidoProduto: async (pedido, usuario) => {
    const response = await v0Api(usuario.token).get(`pedidos/${pedido.eid}/`);
    return response.data.pedido;
  },

  updatePedidoStatus: async (pedido, usuario, transicao) => {
    const response = await v0Api(usuario.token).patch(
      `pedidos/${pedido.eid}/`,
      { transicao },
    );
    return response.data.pedido;
  },

  sendPedidoArquivo: async (
    pedido,
    usuario,
    produto_key,
    nome_arquivo,
    file,
  ) => {
    const formData = new FormData();
    formData.append("file", file);
    return await v0Api(
      usuario.token,
    ).post(
      `pedidos/${pedido.eid}/arquivos/${produto_key}/${nome_arquivo}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );
  },

  getPedidoArquivo: (url, usuario, nome_arquivo) => {
    v0Api(usuario.token)
      .get(url)
      .then((response) => {
        fileDownload(response.data, nome_arquivo);
      });
  },
};

export default PedidoAPI;

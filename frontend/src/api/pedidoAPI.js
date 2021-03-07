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

  fetchPedido: async (pedido, usuario) => {
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

    const response = await v0Api(
      usuario.token,
    ).post(
      `pedidos/${pedido.eid}/arquivos/${produto_key}/${nome_arquivo}`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } },
    );

    if (response.status !== 201) {
      throw new Error(
        `erro upload de arquivo ${pedido.eid}, ${produto_key}, ${nome_arquivo}: ${response.status}`,
      );
    }

    return response.data.pedido;
  },

  createPedidoLog: async (pedido, usuario, mensagem, publico) => {
    let _publico = publico;

    if (!publico && !usuario.permissoes.includes("backoffice")) {
      _publico = true;
    }

    const response = await v0Api(
      usuario.token,
    ).post(`pedidos/${pedido.eid}/logs`, { mensagem, publico: _publico });

    return response.data.pedido_log;
  },
};

export default PedidoAPI;

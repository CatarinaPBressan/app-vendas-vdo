export const getPedido = (pedidos, pedidoEid) => {
  return pedidos.find((pedido) => pedido.eid === pedidoEid);
};

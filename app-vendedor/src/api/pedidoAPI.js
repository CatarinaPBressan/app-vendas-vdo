const PedidoAPI = {
  create: (product, user, data) => {
    return new Promise((resolve, reject) => {
      resolve({
        eid: 'ABCDEF',
        product: product.id,
        user: user.eid,
        data: data,
      });
    });
  },
};

export default PedidoAPI;

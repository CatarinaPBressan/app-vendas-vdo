function uuidv4() {
  // Crappy uuidv4 generator for testing purposes
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

const PedidoAPI = {
  create: (produto, usuario, data) => {
    return new Promise((resolve, reject) => {
      resolve({
        eid: uuidv4(),
        produto: produto.id,
        usuario: usuario.eid,
        data: data,
        status: 'NOVO',
        created_date: new Date().toISOString(),
      });
    });
  },
};

export default PedidoAPI;

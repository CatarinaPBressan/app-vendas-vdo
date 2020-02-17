const UsuarioAPI = {
  fetchUsuario: (username, password) => {
    return new Promise((resolve, reject) =>
      resolve({
        name: 'Arthur de Paula Bressan',
        cpf: '38830880809',
        cnpj: null,
        token: 'userToken',
        eid: 'ABCDEF',
      })
    );
  },

  checkTokenExpired: (usuario) => {
    return new Promise((resolve, reject) => {
      const isExpired = false;
      resolve(isExpired);
    });
  },
};

export default UsuarioAPI;

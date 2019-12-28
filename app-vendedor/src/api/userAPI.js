const UserAPI = {
  fetchUser: (username, password) => {
    return new Promise((resolve, reject) =>
      resolve({
        nome: "Arthur de Paula Bressan",
        cpf: "38830880809",
        cnpj: null,
        token: "userToken"
      })
    );
  },

  checkTokenExpired: user => {
    return new Promise((resolve, reject) => {
      const isExpired = false;
      resolve(isExpired);
    });
  }
};

export default UserAPI;

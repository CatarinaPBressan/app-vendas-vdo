const UserAPI = {
  fetchUser: (username, password) => {
    return new Promise((resolve, reject) =>
      resolve({
        nome: "Arthur de Paula Bressan",
        cpf: "38830880809",
        cnpj: null
      })
    );
  }
};

export default UserAPI;

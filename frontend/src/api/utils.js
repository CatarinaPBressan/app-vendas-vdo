const TOKEN_KEYWORD = "Bearer";

export const getHeaders = (token) => {
  return {
    Authorization: `${TOKEN_KEYWORD} ${token}`,
  };
};

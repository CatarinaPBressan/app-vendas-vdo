import { PRODUTOS } from '../definitions/produtos';

export const getProduto = (produtoId) => {
  return PRODUTOS.find((produto) => produto.id === produtoId);
};

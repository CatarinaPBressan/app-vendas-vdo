import { PRODUCTS } from '../definitions/products';

export const getProduct = (productId) => {
  return PRODUCTS.find((product) => product.id === productId);
};

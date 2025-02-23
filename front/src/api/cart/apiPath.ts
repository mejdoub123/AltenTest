import { ApiPath } from "../../utils/types/api.types";

export const CART_BY_ID_API_PATH = (cartId: number): ApiPath => {
  return { path: `${import.meta.env.VITE_BACKEND_URL}/carts/${cartId}` };
};
export const MANIPULATE_PRODUCT_ITEMS_TO_CART_API_PATH = (
  cartId: number,
  productId: number
): ApiPath => {
  return {
    path: `${import.meta.env.VITE_BACKEND_URL}/carts/${cartId}/items/${productId}`,
  };
};

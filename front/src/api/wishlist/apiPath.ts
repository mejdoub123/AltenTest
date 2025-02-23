import { ApiPath } from "../../utils/types/api.types";

export const WISHLIST_BY_ID_API_PATH = (wishlistId: number): ApiPath => {
  return { path: `${import.meta.env.VITE_BACKEND_URL}/wishlists/${wishlistId}` };
};
export const MANIPULATE_PRODUCT_IN_WISHLIST_API_PATH = (
  wishlistId: number,
  productId: number
): ApiPath => {
  return {
    path: `${import.meta.env.VITE_BACKEND_URL}/wishlists/${wishlistId}/products/${productId}`,
  };
};

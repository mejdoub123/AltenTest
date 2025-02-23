import { ApiPath } from "../../utils/types/api.types";

export const ALL_PRODUCTS_API_PATH: ApiPath = {
  path: `${import.meta.env.VITE_BACKEND_URL}/products`,
};

export const ALL_PRODUCTS_PAGED_API_PATH: ApiPath = {
  path: `${import.meta.env.VITE_BACKEND_URL}/products/paged`,
};

export const PRODUCT_BY_ID_API_PATH = (productId: number): ApiPath => {
  return { path: `${import.meta.env.VITE_BACKEND_URL}/products/${productId}` };
};

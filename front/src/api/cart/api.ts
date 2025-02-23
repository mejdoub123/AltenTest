import { HttpMethods } from "../../utils/enums/api.enums";
import fetchData, { FetchResponse } from "../../utils/helpers/api.helper";
import { Cart, ElementByIdRequest, ManipulateProductRequest } from "../../utils/types/api.types";
import {
  CART_BY_ID_API_PATH,
  MANIPULATE_PRODUCT_ITEMS_TO_CART_API_PATH,
} from "./apiPath";

export const getCartById = (data:ElementByIdRequest): Promise<FetchResponse<Cart>> => {
  return fetchData<Cart>(CART_BY_ID_API_PATH(data.id).path, { method: HttpMethods.GET });
};

export const addProductItem = (
  data: ManipulateProductRequest,
  quantity: number
): Promise<FetchResponse<Cart>> => {
  return fetchData<Cart>(
    MANIPULATE_PRODUCT_ITEMS_TO_CART_API_PATH(data.cartId, data.productId).path,
    { method: HttpMethods.POST },
    { quantity: quantity }
  );
};

export const updateProductItem = (
  data: ManipulateProductRequest,
  quantity: number
): Promise<FetchResponse<Cart>> => {
  return fetchData<Cart>(
    MANIPULATE_PRODUCT_ITEMS_TO_CART_API_PATH(data.cartId, data.productId).path,
    { method: HttpMethods.PUT },
    { quantity: quantity }
  );
};

export const removeProductItem = (
  data: ManipulateProductRequest
): Promise<FetchResponse<Cart>> => {
  return fetchData<Cart>(
    MANIPULATE_PRODUCT_ITEMS_TO_CART_API_PATH(data.cartId, data.productId).path,
    { method: HttpMethods.DELETE }
  );
};

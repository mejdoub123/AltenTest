import { HttpMethods } from "../../utils/enums/api.enums";
import fetchData, { FetchResponse } from "../../utils/helpers/api.helper";
import {
  ElementByIdRequest,
  ManipulateWishlistProductsRequest,
  Wishlist,
} from "../../utils/types/api.types";
import {
  MANIPULATE_PRODUCT_IN_WISHLIST_API_PATH,
  WISHLIST_BY_ID_API_PATH,
} from "./apiPath";

export const getWishlistById = (
  data: ElementByIdRequest
): Promise<FetchResponse<Wishlist>> => {
  return fetchData<Wishlist>(WISHLIST_BY_ID_API_PATH(data.id).path, {
    method: HttpMethods.GET,
  });
};

export const addProductItem = (
  data: ManipulateWishlistProductsRequest
): Promise<FetchResponse<Wishlist>> => {
  return fetchData<Wishlist>(
    MANIPULATE_PRODUCT_IN_WISHLIST_API_PATH(data.wishlistId, data.productId)
      .path,
    { method: HttpMethods.POST }
  );
};

export const removeProductItem = (
  data: ManipulateWishlistProductsRequest
): Promise<FetchResponse<Wishlist>> => {
  return fetchData<Wishlist>(
    MANIPULATE_PRODUCT_IN_WISHLIST_API_PATH(data.wishlistId, data.productId)
      .path,
    { method: HttpMethods.DELETE }
  );
};

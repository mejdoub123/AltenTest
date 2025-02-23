
import { HttpMethods } from "../../utils/enums/api.enums";
import fetchData,{ FetchResponse }  from "../../utils/helpers/api.helper";
import { ElementByIdRequest, PaginatedProductResponse, Product, ProductListPageableRequest } from "../../utils/types/api.types";
import { ALL_PRODUCTS_API_PATH, ALL_PRODUCTS_PAGED_API_PATH, PRODUCT_BY_ID_API_PATH } from "./apiPath";

export const getProductsList = (): Promise<FetchResponse<Product[]>> => {
    return fetchData<Product[]>(ALL_PRODUCTS_API_PATH.path, { method:HttpMethods.GET});
};
export const getProductsPeagableList = (data:ProductListPageableRequest): Promise<FetchResponse<PaginatedProductResponse>> => {
  return fetchData<PaginatedProductResponse>(ALL_PRODUCTS_PAGED_API_PATH.path, { method:HttpMethods.GET},data);
};

export const getProductById = (data:ElementByIdRequest): Promise<FetchResponse<Product>> => {
  return fetchData<Product>(PRODUCT_BY_ID_API_PATH(data.id).path, { method:HttpMethods.GET});
};
export interface ApiPath {
  path: string;
}
export interface Product {
  id: number;
  code: string;
  name: string;
  description: string;
  image: string;
  category: string;
  price: number;
  quantity: number;
  internalReference: string;
  shellId: number;
  inventoryStatus: "INSTOCK" | "LOWSTOCK" | "OUTOFSTOCK";
  rating: number;
  createdAt: number;
  updatedAt: number;
}
export interface CartItem {
  id: number;
  product: Product;
  quantity: number;
}
export interface Cart {
  id: number;
  items: CartItem[];
}
export interface Wishlist {
  id: number;
  products: Product[];
}
export interface ManipulateWishlistProductsRequest {
  wishlistId: number;
  productId: number;
}
export interface ProductListPageableRequest {
  category: string;
  name: string;
  page: number;
  size: number;
  minPrice: string;
  maxPrice: string;
}
interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}
interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}
export interface PaginatedProductResponse {
  content: Product[];
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
export interface ManipulateProductRequest {
  cartId: number;
  productId: number;
}
export interface SignUpRequest {
  firstname: string;
  username: string;
  email: string;
  password: string;
}
export interface SignInRequest {
  email: string;
  password: string;
}
export interface ElementByIdRequest {
  id: number;
}
export interface ResponseMessage {
  messageContent: string;
  messageType: string;
}
export interface GenericResponse<T> {
  createdAt: string;
  status: number;
  state: string;
  message: ResponseMessage;
  body: T;
}
export interface PageResponse<T> {
  pagination: PagebleResponse;
  data: T;
}
export interface PagebleResponse {
  currentPage: number;
  totalPages: number;
  totalLength: number;
}
export interface User {
  id: number;
  firstname: string;
  username: string;
  email: string;
  roles: string[];
  createdAt: number;
  updatedAt: number;
  wishlist: Wishlist;
  cart: Cart;
}
export interface SignInResponse {
  user: User;
  token: string;
}
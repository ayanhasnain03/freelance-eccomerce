import { Product } from './type.ts';

export interface GetProductsResponse {
  totalPage: number;
  totalProducts: number;
  products: Product[];
}

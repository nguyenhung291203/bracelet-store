import { ApiResponse } from "./api-response";
import { apiFetch } from "./http";
import { Product, ProductDetail } from "@/types/product.type";

export const productApi = {
  getAll() {
    return apiFetch<ApiResponse<Product[]>>("/api/products");
  },

  getDetail(id: number | string) {
    return apiFetch<ApiResponse<ProductDetail>>(`/api/products/${id}`);
  },
};

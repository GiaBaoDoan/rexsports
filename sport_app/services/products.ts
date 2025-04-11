import AxiosIntance from "@/lib/configAxios";
import { ProductType } from "@/schema/product";
import { ProductRes } from "@/types/product";
import { ApiResponse } from "@/types/types";

export const ProductServices = {
  fetchProducts: (params: string) =>
    AxiosIntance.get<ApiResponse<ProductRes[]>>(`/products?${params}`),
  fetchProduct: (idOrSlug: string) =>
    AxiosIntance.get<ApiResponse<ProductRes>>(`/products/${idOrSlug}`),
  createProduct: (data: ProductType) =>
    AxiosIntance.post<ApiResponse<ProductRes>>(`/products`, data),
  deleteProduct: (id: string) =>
    AxiosIntance.delete<ApiResponse<ProductRes>>(`/products/${id}`),
  updateProduct: (id: string, data: ProductType) =>
    AxiosIntance.put<ApiResponse<ProductRes>>(`/products/${id}`, data),
};

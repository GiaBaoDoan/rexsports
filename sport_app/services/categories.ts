import { CategoriesRes } from "@/types/category";
import { CategorySchemaType } from "@/schema/category";
import { ApiResponse } from "@/types/types";
import AxiosIntance from "@/lib/configAxios";

export const CategoriesService = {
  fetchCategories: () =>
    AxiosIntance.get<ApiResponse<CategoriesRes[]>>(`categories`),
  deleteCategory: (id: string) =>
    AxiosIntance.delete<ApiResponse<CategoriesRes>>(`categories/${id}`),
  createCategory: (data: CategorySchemaType) =>
    AxiosIntance.post<ApiResponse<CategoriesRes>>(`categories`, data),
  updateCategory: (id: string, data: CategorySchemaType) =>
    AxiosIntance.put<ApiResponse<CategoriesRes>>(`categories/${id}`, data),
  fetchCategory: (id: string) =>
    AxiosIntance.get<ApiResponse<CategoriesRes>>(`categories/${id}`),
};

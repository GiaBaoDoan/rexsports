import { API_URL } from "@/lib/contanst";
import { ProductRes } from "@/types/product";
import { ApiResponse } from "@/types/types";

export const getAllProductsSever = async () => {
  const res = await fetch(`${API_URL}/products`, {
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch products");

  const data = (await res.json()) as ApiResponse<ProductRes[]>;
  return data.data;
};

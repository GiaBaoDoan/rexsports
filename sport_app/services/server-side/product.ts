import { API_URL } from "@/lib/contanst";
import { ProductRes } from "@/types/product";
import { ApiResponse } from "@/types/types";

export const getAllProductsSever = async () => {
  try {
    const res = await fetch(`${API_URL}/products`, {
      cache: "no-store",
    });
    const data = (await res.json()) as ApiResponse<ProductRes[]>;
    return data.data;
  } catch (err) {
    console.log(err);
  }
};

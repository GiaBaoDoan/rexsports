import { API_URL } from "@/lib/contanst";
import { BannerRes } from "@/types/banner";
import { ApiResponse } from "@/types/types";

export const getAllBannersServer = async () => {
  const res = await fetch(`${API_URL}/banners`, {
    cache: "no-store",
  });

  if (!res.ok) throw new Error("Failed to fetch products");

  const data = (await res.json()) as ApiResponse<BannerRes[]>;

  return data.data;
};

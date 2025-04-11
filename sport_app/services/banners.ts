import AxiosInstance from "@/lib/configAxios";
import { BannerRequestForm } from "@/schema/banner";
import { BannerRes } from "@/types/banner";
import { ApiResponse } from "@/types/types";

export const bannerServices = {
  fetchBanners: () => AxiosInstance.get<ApiResponse<BannerRes[]>>("/banners"),

  createBanner: (data: BannerRequestForm) =>
    AxiosInstance.post<ApiResponse<BannerRes>>("/banners", data),

  fetchBannerById: (id: string) =>
    AxiosInstance.get<ApiResponse<BannerRes>>(`/banners/${id}`),

  updateBanner: (id: string, data: BannerRequestForm) =>
    AxiosInstance.put<ApiResponse<BannerRes>>(`/banners/${id}`, data),

  deleteBanner: (id: string) =>
    AxiosInstance.delete<ApiResponse<BannerRes>>(`/banners/${id}`),
};

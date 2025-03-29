import AxiosIntance from "@/lib/configAxios";
import { RevenueRes } from "@/types/dashboard";
import { ApiResponse } from "@/types/types";

export const AdminSeverice = {
  fetchRevenue: async () =>
    AxiosIntance.get<ApiResponse<RevenueRes>>("/dashboard"),
};

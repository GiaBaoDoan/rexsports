import AxiosIntance from "@/lib/configAxios";
import { ReportRes, RevenueRes } from "@/types/dashboard";
import { ApiResponse } from "@/types/types";

export const AdminSeverice = {
  fetchRevenue: async () =>
    AxiosIntance.get<ApiResponse<RevenueRes>>("/dashboard"),
  getReport: async (params: string) =>
    AxiosIntance.get<ApiResponse<ReportRes>>(`/dashboard/report${params}`),
};

import { UserReqType } from "@/components/forms/UserForm";
import AxiosInstance from "@/lib/configAxios";
import { ApiResponse } from "@/types/types";
import { UserResType } from "@/types/user";

export const UserServices = {
  getAllUsers: () => AxiosInstance.get<ApiResponse<UserResType[]>>("/users/"),
  getUserById: (id: string) =>
    AxiosInstance.get<ApiResponse<UserResType>>(`/users/${id}`),
  updateUser: (id: string, data: UserReqType) =>
    AxiosInstance.put<ApiResponse<UserResType>>(`/users/${id}`, data),
  deleteUser: (id: string) =>
    AxiosInstance.delete<ApiResponse<UserResType>>(`/users/${id}`),
};

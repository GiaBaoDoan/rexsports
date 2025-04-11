import { loginType } from "@/components/forms/LoginForm";
import AxiosInstance from "@/lib/configAxios";
import { UpdatePasswordType } from "@/schema/password";
import { ProfileReqType } from "@/schema/profile";
import { signupType } from "@/store/thunk/signup";
import { ApiResponse } from "@/types/types";
import { UserResType } from "@/types/user";

export const AuthServices = {
  getMe: () => AxiosInstance.get<ApiResponse<UserResType>>("/auth/me"),
  verifyEmail: (id: string, token: string) =>
    AxiosInstance.get<ApiResponse<UserResType>>(`/auth/verify/${id}/${token}`),
  requestResetPassword: (email: string) => {
    return AxiosInstance.post<ApiResponse<UserResType>>(`/auth/new-password`, {
      email,
    });
  },
  resetNewPassword: (userId: string, token: string, password: string) => {
    return AxiosInstance.post<ApiResponse<UserResType>>(
      `/auth/reset-password/${userId}/${token}`,
      { newPassword: password }
    );
  },
  updateMe: (data: ProfileReqType) =>
    AxiosInstance.put<ApiResponse<UserResType>>("/auth/me", data),
  updatePassword: (data: UpdatePasswordType) =>
    AxiosInstance.put<ApiResponse<UserResType>>("/auth/updatePassword", data),
  login: (data: loginType) =>
    AxiosInstance.post<ApiResponse<UserResType>>("/auth/login", data),
  signUp: (data: signupType) =>
    AxiosInstance.post<ApiResponse<UserResType>>("/auth/signup", data),
  logout: () => AxiosInstance.post<ApiResponse<UserResType>>("/auth/logout"),
};

import { API_URL } from "@/lib/contanst";
import { store } from "@/store/store";
import { LogoutThunk } from "@/store/thunk/logout";
import { ApiError } from "@/types/types";
import axios, { AxiosError } from "axios";

const AxiosIntance = axios.create({
  baseURL: API_URL,
  timeout: 20000, // break when 20s is over
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

AxiosIntance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    if (error.response?.status === 401) {
      window.location.href = "/auth/login";
      store.dispatch(LogoutThunk());
    }
    return Promise.reject(error);
  }
);
export default AxiosIntance;

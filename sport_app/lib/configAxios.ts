import { API_URL } from "@/lib/contanst";
import { ApiError } from "@/types/types";
import axios, { AxiosError } from "axios";

const AxiosIntance = axios.create({
  baseURL: API_URL,
  timeout: 20000, // break when 20s is over
  headers: { "Content-Type": "application/json" },
});

AxiosIntance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    return Promise.reject(error);
  }
);
export default AxiosIntance;

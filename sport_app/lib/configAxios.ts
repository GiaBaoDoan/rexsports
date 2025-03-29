import { ApiError } from "@/types/types";
import axios, { AxiosError } from "axios";

const AxiosIntance = axios.create({
  baseURL: "http://localhost:5000/api",
  timeout: 20000, // break when 10s is over
  headers: { "Content-Type": "application/json" },
});

AxiosIntance.interceptors.response.use(
  (response) => response,
  (error: AxiosError<ApiError>) => {
    return Promise.reject(error);
  }
);
export default AxiosIntance;

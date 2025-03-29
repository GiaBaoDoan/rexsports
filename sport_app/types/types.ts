export interface PaginationRes {
  totalRecords: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

export interface ApiResponse<T> {
  status: string;
  message: string;
  pagination?: PaginationRes;
  data: T; // Dữ liệu trả về có thể là bất kỳ loại dữ liệu nào
}

export interface ApiError {
  success: boolean;
  message: string;
  data: unknown;
}

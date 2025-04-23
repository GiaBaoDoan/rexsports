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
  data: T;
}

export interface ApiError {
  success: boolean;
  message: string;
  data: unknown;
}

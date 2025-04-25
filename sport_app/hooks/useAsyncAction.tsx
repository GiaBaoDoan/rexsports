"use client";

import { toast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/store/store";
import { ApiError, ApiResponse } from "@/types/types";
import { AxiosError } from "axios";
import { useState } from "react";

export default function useAsyncAction<T>() {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const execute = async ({
    actionCreator,
    callBack,
  }: {
    actionCreator: () => any;
    callBack?: (res: ApiResponse<T>) => void;
  }) => {
    setIsLoading(true);
    try {
      const res = (await dispatch(actionCreator()).unwrap()) as ApiResponse<T>;
      toast({
        title: "Thành công 🎉",
        description: res.message || "Thao tác thành công!",
      });
      if (callBack) callBack(res);
    } catch (err) {
      const newErr = err as AxiosError<ApiError>;
      let errorMessage;

      if (!newErr.response) {
        errorMessage = "Lỗi từ máy chủ. Vui lòng thử lại sau!";
      } else {
        errorMessage = newErr.response.data.message || "Lỗi không xác định!";
      }
      toast({
        title: "Lỗi ❌",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return { execute, isLoading };
}

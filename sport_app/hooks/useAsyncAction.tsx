"use client";

import { toast } from "@/hooks/use-toast";
import { useAppDispatch } from "@/store/store";
import { ApiError, ApiResponse } from "@/types/types";
import { AxiosError } from "axios";
import { useState } from "react";

const useAsyncAction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const execute = async ({
    actionCreator,
    callBack,
  }: {
    actionCreator: () => any;
    callBack?: (res?: ApiResponse<any>) => void;
  }) => {
    setIsLoading(true);
    try {
      const res = await dispatch(actionCreator()).unwrap();
      toast({ description: `✅ ${res?.message}` });
      if (callBack) {
        callBack(res);
      }
    } catch (err) {
      const newErr = err as AxiosError<ApiError>;
      if (newErr.status === 500) {
        toast({ description: `❌ Lỗi đến từ máy chủ` });
      } else {
        toast({ description: `❌ ${newErr?.response?.data.message}` });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { execute, isLoading };
};

export default useAsyncAction;

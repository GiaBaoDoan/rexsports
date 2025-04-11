"use client";

import { useAppDispatch } from "@/store/store";
import { VerifyEmailThunk } from "@/store/thunk/verify-email";
import { ApiError } from "@/types/types";
import { AxiosError } from "axios";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

const VerifyEmailPage = () => {
  const { id, token } = useParams();
  const dispatch = useAppDispatch();

  const [status, setStatus] = useState<"success" | "error" | "loading">(
    "loading"
  );
  const [message, setMessage] = useState<string>("Đang xác thực...");

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await dispatch(
          VerifyEmailThunk({ id: id as string, token: token as string })
        ).unwrap();
        setStatus("success");
        setMessage(res.message || "Xác thực Email thành công!");
      } catch (error) {
        const newError = error as AxiosError<ApiError>;
        setStatus("error");
        setMessage(
          newError.response?.data.message ||
            "Liên kết không hợp lệ hoặc đã hết hạn."
        );
      }
    };

    verify();
  }, [dispatch, id, token]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <h2
          className={`text-2xl font-bold mb-4 ${
            status === "success"
              ? "text-green-600"
              : status === "error"
              ? "text-red-600"
              : "text-gray-600"
          }`}
        >
          {message}
        </h2>
        {status === "success" && (
          <>
            <p className="text-gray-600 mb-6">
              Cảm ơn bạn đã xác thực tài khoản. Bây giờ bạn có thể đăng nhập và
              trải nghiệm dịch vụ.
            </p>
            <Link
              href="/login"
              className="inline-block bg-green-600 text-white px-5 py-2 rounded-full hover:bg-green-700 transition duration-300"
            >
              Đăng nhập ngay
            </Link>
          </>
        )}
        {status === "error" && <p className="text-gray-600">{message}</p>}
      </div>
    </div>
  );
};

export default VerifyEmailPage;

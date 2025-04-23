"use client";

import UserForm, { UserReqType } from "@/components/forms/UserForm";
import Loading from "@/components/ui/loading";
import useFetchData from "@/hooks/use-fetch-data";
import useAsyncAction from "@/hooks/useAsyncAction";
import { useAppSelector } from "@/store/store";
import { getUserById } from "@/store/thunk/get-userById";
import { UpdateUserThunk } from "@/store/thunk/update-user";
import { ImageType } from "@/types/product";
import { RoleType } from "@/types/user";
import { useParams } from "next/navigation";
import { useMemo } from "react";

const UserDetailPage = () => {
  const { user, isLoading } = useAppSelector((state) => state.UserReducer);
  const { id } = useParams();
  const { execute, isLoading: isSumiting } = useAsyncAction();

  useFetchData(() => getUserById(`${id}`), [id]);

  const data: UserReqType = useMemo(
    () => ({
      email: user?.email ?? "",
      name: user?.name ?? "",
      role: user?.role as RoleType,
      status: String(user?.status ?? ""),
      phone: user?.phone ?? "",
      address: user?.address || "",
      description: user?.description || "",
      image: user?.image as ImageType,
    }),
    [user]
  );

  const handleUpdate = (user: UserReqType) => {
    execute({
      actionCreator: () => UpdateUserThunk({ id: id as string, user }),
    });
  };

  if (isLoading) return <Loading />;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-5">
        📝 Cập nhật người dùng
      </h1>
      <UserForm onSubmit={handleUpdate} isSubmiting={isSumiting} user={data} />
    </div>
  );
};

export default UserDetailPage;

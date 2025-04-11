"use client";

import UserTable from "@/components/tables/UserTable";
import { Button } from "@/components/ui/button";
import { PATH } from "@/lib/contanst";
import { useAppDispatch } from "@/store/store";
import { getAllUsersThunk } from "@/store/thunk/get-users";
import Link from "next/link";
import { useEffect } from "react";

const UsersPage = () => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllUsersThunk());
  }, [dispatch]);
  return (
    <section>
      <header className="flex flex-wrap justify-between items-center gap-3 mb-7">
        <h1
          className="text-3xl font-bold text-gray-800"
          aria-label="Quản lý sản phẩm"
        >
          📂 Quản lý người dùng
        </h1>
        <Link href={PATH.products.add}>
          <Button className="px-4 py-2 font-medium">+ Người dùng</Button>
        </Link>
      </header>
      <UserTable />
    </section>
  );
};

export default UsersPage;

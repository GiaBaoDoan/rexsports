"use client";

import PaginationCustom from "@/components/common/Pagination";
import UserFilter from "@/components/filters/UserFilter";
import UserTable from "@/components/tables/UserTable";
import Loading from "@/components/ui/loading";
import useFetchData from "@/hooks/use-fetch-data";
import { useAppSelector } from "@/store/store";
import { getAllUsersThunk } from "@/store/thunk/get-users";
import { PaginationRes } from "@/types/types";
import { Suspense } from "react";

const UsersPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <UsersPageContent />
    </Suspense>
  );
};

const UsersPageContent = () => {
  const { pagination } = useAppSelector((state) => state.UsersReducer);

  useFetchData(() => getAllUsersThunk(), []);

  return (
    <section>
      <header className="flex flex-wrap justify-between items-center gap-3 mb-7">
        <h1
          className="text-3xl font-bold text-gray-800"
          aria-label="Quản lý sản phẩm"
        >
          📂 Quản lý người dùng
        </h1>
      </header>
      <div className="space-y-5">
        <UserFilter />
        <UserTable />
        <PaginationCustom pagination={pagination as PaginationRes} />
      </div>
    </section>
  );
};

export default UsersPage;

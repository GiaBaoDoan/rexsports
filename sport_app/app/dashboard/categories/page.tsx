"use client";

import { Button } from "@/components/ui/button";
import { PATH } from "@/lib/contanst";
import { useAppDispatch } from "@/store/store";
import { fetchCategories } from "@/store/thunk/fetch-categories";
import { useEffect } from "react";
import Link from "next/link";
import CategoryFilter from "@/components/filters/CategoryFilter";
import CategoryTable from "@/components/tables/CategoryTable";

const CategoryPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  return (
    <section className="space-y-5">
      <header className="flex flex-wrap justify-between items-center gap-3">
        <h1
          className="text-3xl font-bold text-gray-800"
          aria-label="Quản lý danh mục"
        >
          📂 Quản lý danh mục
        </h1>
        <Link href={PATH.categories.add}>
          <Button className="px-4 py-2">+ Thêm danh mục</Button>
        </Link>
      </header>
      <CategoryFilter />
      <CategoryTable />
    </section>
  );
};

export default CategoryPage;

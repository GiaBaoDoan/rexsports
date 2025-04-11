"use client";

import BannerFilter from "@/components/filters/BannerFilter";
import BannerTable from "@/components/tables/BannerTable";
import { Button } from "@/components/ui/button";
import { PATH } from "@/lib/contanst";
import { useAppDispatch } from "@/store/store";
import { fetchBanners } from "@/store/thunk/fetch-banners";
import Link from "next/link";
import { useEffect } from "react";

export default function BannersPage() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  return (
    <section>
      <header className="flex flex-wrap justify-between items-center gap-3 mb-7">
        <h1
          className="text-3xl font-bold text-gray-800"
          aria-label="Quản lý danh mục"
        >
          📂 Quản lý Banner
        </h1>
        <Link href={PATH.banner.add}>
          <Button className="px-4 py-2">+ Thêm banner</Button>
        </Link>
      </header>
      <BannerFilter />
      <BannerTable />
    </section>
  );
}

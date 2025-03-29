"use client";

import Link from "next/link";
import CollectionTable from "@/components/tables/CollectionTable";
import { Button } from "@/components/ui/button";
import { PATH } from "@/lib/contanst";
import { useAppDispatch } from "@/store/store";
import { getAllCollections } from "@/store/thunk/fetch-collections";
import { useEffect } from "react";

const CollectionPage = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllCollections());
  }, [dispatch]);

  return (
    <section>
      <header className="flex flex-wrap justify-between items-center gap-3 mb-7">
        <h1
          className="text-3xl font-bold text-gray-800"
          aria-label="Quản lý bộ sưu tập"
        >
          📂 Quản lý bộ sưu tập
        </h1>
        <Link href={PATH.collection.add}>
          <Button className="px-4 py-2">+ Thêm bộ sưu tập</Button>
        </Link>
      </header>
      <CollectionTable />
    </section>
  );
};

export default CollectionPage;

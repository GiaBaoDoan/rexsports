"use client";

import Link from "next/link";
import CollectionTable from "@/components/tables/CollectionTable";
import { Button } from "@/components/ui/button";
import { PATH } from "@/lib/contanst";
import { getAllCollections } from "@/store/thunk/fetch-collections";
import CollectionFilter from "@/components/filters/CollectionFilter";
import useFetchData from "@/hooks/use-fetch-data";

const CollectionPage = () => {
  useFetchData(getAllCollections, []);
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
      <div className="space-y-7">
        <CollectionFilter />
        <CollectionTable />
      </div>
    </section>
  );
};

export default CollectionPage;

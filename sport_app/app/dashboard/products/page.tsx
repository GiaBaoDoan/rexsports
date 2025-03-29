"use client";

import { Button } from "@/components/ui/button";
import { PATH } from "@/lib/contanst";
import Link from "next/link";

import PaginationCustom from "@/components/common/Pagination";
import ProductFilter from "@/components/filters/ProductFilter";
import ProductsTable from "@/components/tables/ProductTable";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchProductsThunk } from "@/store/thunk/fetch-products";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";
import Loading from "@/components/ui/loading";

const ProductPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <ProductPageContent />
    </Suspense>
  );
};

const ProductPageContent = () => {
  const { pagination } = useAppSelector((state) => state.ProductsReducer);

  const dispatch = useAppDispatch();

  const queries = useSearchParams();

  useEffect(() => {
    dispatch(fetchProductsThunk(`${queries}&isAdmin=true`));
  }, [queries, dispatch]);

  return (
    <section className="space-y-5">
      <header className="flex flex-wrap justify-between items-center gap-3 mb-7">
        <h1
          className="text-3xl font-bold text-gray-800"
          aria-label="Quản lý sản phẩm"
        >
          📂 Quản lý sản phẩm
        </h1>
        <Link href={PATH.products.add}>
          <Button className="px-4 py-2 font-medium">+ Thêm sản phẩm</Button>
        </Link>
      </header>
      <ProductFilter />
      <ProductsTable />
      <PaginationCustom pagination={pagination} />
    </section>
  );
};

export default ProductPage;

"use client";

import PaginationCustom from "@/components/common/Pagination";
import OrderFilter from "@/components/filters/OrderFilter";
import OrderTable from "@/components/tables/OrderTable";
import Loading from "@/components/ui/loading";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchOrders } from "@/store/thunk/fetch-orders";
import { PaginationRes } from "@/types/types";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect } from "react";

const OrderPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <OrderPageContent />
    </Suspense>
  );
};

const OrderPageContent = () => {
  const { pagination } = useAppSelector((state) => state.OrdersReducer);

  const dispatch = useAppDispatch();

  const queries = useSearchParams();

  useEffect(() => {
    dispatch(fetchOrders(`${queries}`));
  }, [queries, dispatch]);

  return (
    <section>
      <header className="flex flex-wrap justify-between items-center gap-3 mb-5">
        <h1
          className="text-3xl font-bold text-gray-800"
          aria-label="Quản lý sản phẩm"
        >
          📂 Quản lý đơn hàng
        </h1>
      </header>
      <OrderFilter />
      <OrderTable />
      <PaginationCustom pagination={pagination as PaginationRes} />
    </section>
  );
};

export default OrderPage;

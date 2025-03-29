"use client";

import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchOrders } from "@/store/thunk/fetch-orders";
import { fetchRevenue } from "@/store/thunk/fetch-revenue";
import { useEffect } from "react";
import OrderRecently from "@/components/admin/dashboard/OrderRecently";
import RevenueOverTime from "@/components/admin/dashboard/Revenue";

const Dashboard = () => {
  const dispatch = useAppDispatch();

  const { revenue } = useAppSelector((state) => state.RevenueReducer);

  useEffect(() => {
    dispatch(fetchRevenue());
    dispatch(fetchOrders(""));
  }, [dispatch]);

  return (
    <div>
      {/* revenue + order count */}
      <RevenueOverTime data={revenue} />
      {/* demo list orders */}
      <OrderRecently />
    </div>
  );
};
export default Dashboard;

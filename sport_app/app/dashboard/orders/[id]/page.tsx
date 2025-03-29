"use client";

import OrderReceiverForm from "@/components/forms/OrderReceiverForm";
import OrderStatusForm from "@/components/forms/OrderStatusForm";
import CartTable from "@/components/tables/CartTable";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { getDate } from "@/lib/date";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchOrder } from "@/store/thunk/fetch-order";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const AdminOrder = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();
  const { order } = useAppSelector((state) => state.OrderReducer);

  useEffect(() => {
    dispatch(fetchOrder(`${id}`));
  }, [id, dispatch]);

  return (
    <div>
      <h1 className="font-semibold text-3xl">Đơn hàng</h1>
      <div className="grid grid-cols-4 gap-5">
        <Card className="col-span-3">
          <CardHeader className="flex justify-between flex-row mb-5">
            <p className="font-bold">Mã đơn: {order?._id?.slice(0, 10)} </p>
            <p className="text-sm text-slate-500">
              {getDate(`${order?.createdAt}`)}
            </p>
          </CardHeader>
          <CardContent>
            <CartTable />
          </CardContent>
          <CardFooter className="block">
            <OrderReceiverForm />
          </CardFooter>
        </Card>
        <OrderStatusForm />
      </div>
    </div>
  );
};

export default AdminOrder;

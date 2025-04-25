"use client";

import OrderReceiverForm from "@/components/forms/OrderReceiverForm";
import OrderStatusForm from "@/components/forms/OrderStatusForm";
import CartTable from "@/components/tables/CartTable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import useFetchData from "@/hooks/use-fetch-data";
import useAsyncAction from "@/hooks/useAsyncAction";
import { getDate } from "@/lib/date";
import { useAppSelector } from "@/store/store";
import { confirmOrder } from "@/store/thunk/confirm-email";
import { fetchOrder } from "@/store/thunk/fetch-order";
import { MoveRight } from "lucide-react";
import { useParams } from "next/navigation";

const AdminOrder = () => {
  const { id } = useParams();
  const { order } = useAppSelector((state) => state.OrderReducer);

  const { execute, isLoading } = useAsyncAction();

  const handleConfirmEmail = () => {
    execute({
      actionCreator: () => confirmOrder(`${id}`),
    });
  };

  useFetchData(() => fetchOrder(id as string), [id as string]);

  return (
    <div>
      <h1 className="font-semibold text-3xl mb-5">Đơn hàng</h1>
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
            <OrderReceiverForm />
          </CardContent>
          <CardFooter>
            <Button disabled={isLoading} onClick={handleConfirmEmail}>
              Mail cho khách hàng <MoveRight />
            </Button>
          </CardFooter>
        </Card>
        <OrderStatusForm />
      </div>
    </div>
  );
};

export default AdminOrder;

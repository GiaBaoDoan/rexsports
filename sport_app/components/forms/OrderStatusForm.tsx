"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { updateOrderStatus } from "@/store/thunk/update-order";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import useAsyncAction from "@/hooks/useAsyncAction";
import { fetchOrder } from "@/store/thunk/fetch-order";
import { OrderReqType, ShippingType } from "@/types/order";

const OrderStatusForm = () => {
  const { id } = useParams();

  const { order } = useAppSelector((state) => state.OrderReducer);
  const { execute, isLoading } = useAsyncAction();
  const dispatch = useAppDispatch();

  const handleUpdate = () => {
    execute({
      actionCreator: () =>
        updateOrderStatus({
          id: `${id}`,
          data,
        }),
      callBack: () => dispatch(fetchOrder(`${id}`)),
    });
  };

  const [data, setData] = useState<Partial<OrderReqType>>({
    shipping: "Pending",
    isPaid: "false",
    adminNote: "",
  });

  useEffect(() => {
    setData({
      shipping: `${order?.shipping as ShippingType}`,
      isPaid: `${order?.isPaid ?? "false"}`,
      adminNote: `${order?.adminNote ?? ""}`,
    });
  }, [order]);

  return (
    <Card className="flex flex-col p-3 space-y-5 self-start">
      <div className="space-y-2">
        <Label className="mb-3">Tình trạng đơn hàng</Label>
        <Select
          value={data.shipping}
          onValueChange={(shipping) =>
            setData({ ...data, shipping: shipping as ShippingType })
          }
        >
          <SelectTrigger className="mb-5">
            <SelectValue placeholder="Tình trạng đơn" />
          </SelectTrigger>
          <SelectContent className="text-sm cursor-pointer">
            <SelectItem value="Pending">Chờ xác nhận</SelectItem>
            <SelectItem value="Confirmed">Đã xác nhận</SelectItem>
            <SelectItem value="Shipped">Đang giao hàng</SelectItem>
            <SelectItem value="Delivered">Đã giao hàng</SelectItem>
            <SelectItem value="Cancelled">Đã hủy bỏ</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Thanh toán</Label>
        <Select
          value={data.isPaid}
          onValueChange={(isPaid) => setData({ ...data, isPaid })}
        >
          <SelectTrigger className="mb-5">
            <SelectValue placeholder="Thanh toán" />
          </SelectTrigger>
          <SelectContent className="">
            <SelectItem value="false">Chưa thanh toán</SelectItem>
            <SelectItem value="true">Đã Thanh toán</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label>Admin note</Label>
        <Textarea
          onChange={(e) => setData({ ...data, adminNote: e.target.value })}
          value={`${data.adminNote}`}
          className="min-h-[100px]"
          placeholder="Type your message here."
        />
      </div>
      <Button onClick={handleUpdate} disabled={isLoading} className="shadow">
        Cập nhật
      </Button>
    </Card>
  );
};

export default OrderStatusForm;

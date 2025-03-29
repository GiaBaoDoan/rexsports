"use client";
import { Button } from "@/components/ui/button";
import OrderShipping from "@/components/ui/order-shipping";

import { getDate } from "@/lib/date";
import { formatCurrency } from "@/lib/format";
import { calculateCartTotal } from "@/lib/math";
import { OrderResType } from "@/types/order";
import { useRouter } from "next/navigation";
import { CgArrowTopRight } from "react-icons/cg";

const CartItem = ({ order }: { order: OrderResType }) => {
  const router = useRouter();
  return (
    <div className="border p-3 rounded-lg flex flex-col">
      <div className="flex items-center justify-between text-sm mb-5">
        <span>{getDate(order.createdAt)}</span>
        <OrderShipping order={order} />
      </div>
      <div className="mb-5">
        {order?.cart.map((item, index: number) => (
          <p key={index} className="text-sm mb-1">
            {item.quantity}x {item.name}
          </p>
        ))}
      </div>
      <p className="text-sm mb-1">
        <span className="font-bold">Tên người nhận:</span> {order.name}
      </p>
      <p className="text-sm mb-1">
        <span className="font-bold">Thanh tiền:</span>{" "}
        {formatCurrency(calculateCartTotal(order.cart))}
      </p>
      <p className="text-sm mb-1">
        <span className="font-bold">Thanh toán:</span> {order.payment}
      </p>
      <Button
        className="self-end"
        onClick={() => router.push(`/checkout-success/${order._id}`)}
      >
        Chi tiết <CgArrowTopRight />
      </Button>
    </div>
  );
};

export default CartItem;

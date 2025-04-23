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
    <div className="border border-gray-200 p-4 rounded-xl shadow-sm flex flex-col gap-3 bg-white">
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{getDate(order.createdAt)}</span>
        <OrderShipping order={order} />
      </div>

      <div className="bg-gray-50 rounded-md p-3">
        {order?.cart.map((item, index: number) => (
          <p key={index} className="text-sm text-gray-800">
            <span className="font-medium">{item.quantity}x</span> {item.name}
          </p>
        ))}
      </div>

      <div className="space-y-1 text-sm text-gray-700">
        <p>
          <span className="font-semibold">👤 Người nhận:</span> {order.name}
        </p>
        <p>
          <span className="font-semibold">💰 Thành tiền:</span>{" "}
          {formatCurrency(calculateCartTotal(order.cart))}
        </p>
        <p>
          <span className="font-semibold">💳 Thanh toán:</span> {order.payment}
        </p>
      </div>

      <div className="flex justify-end mt-3">
        <Button
          variant="outline"
          className="flex items-center gap-1 text-sm w-full"
          onClick={() => router.push(`/checkout-success/${order._id}`)}
        >
          Chi tiết <CgArrowTopRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default CartItem;

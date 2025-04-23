"use client";

import CartTable from "@/components/tables/CartTable";
import OrderPaid from "@/components/ui/order-paid";
import OrderShipping from "@/components/ui/order-shipping";
import { getDate } from "@/lib/date";
import { formatCurrency } from "@/lib/format";
import { calculateCartTotal } from "@/lib/math";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchOrder } from "@/store/thunk/fetch-order";
import { OrderResType } from "@/types/order";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const { id } = useParams();

  const { order } = useAppSelector((state) => state.OrderReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchOrder(`${id}`));
  }, [id, dispatch]);

  return (
    <div className="w-[80%] container mx-auto py-10">
      <article className="mb-5">
        <h1 className="text-6xl font-medium">Cảm ơn bạn đã mua hàng</h1>
        <p className="text-lg mt-2">
          Xin trân trọng cảm ơn quý khách hàng đã lựa chọn sản phẩm của chúng
          tôi. Khi đơn hàng được xác nhận thành công, chúng tôi sẽ gửi một email
          thông báo đến <span className="font-bold">địa chỉ email </span> mà quý
          khách đã cung cấp. Trong trường hợp không có địa chỉ email, chúng tôi
          sẽ tiến hành xác nhận qua
          <span className="font-bold"> tin nhắn SMS.</span>
        </p>
      </article>
      <section className="bg-muted/50 p-6 rounded-2xl shadow-sm mb-10 border">
        <h2 className="text-2xl font-semibold mb-6 text-primary">
          🧾 Thông tin đơn hàng
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8 text-sm leading-relaxed">
          <p>
            <span className="font-semibold text-foreground">Mã đơn hàng:</span>{" "}
            {order?._id}
          </p>
          <p>
            <OrderShipping order={order as OrderResType} />
          </p>
          <p>
            <span className="font-semibold text-foreground">Ngày đặt:</span>{" "}
            {getDate(`${order?.createdAt}`)}
          </p>
          <p>
            <span className="font-semibold text-foreground">
              Tên người nhận:
            </span>{" "}
            {order?.name}
          </p>
          <p>
            <span className="font-semibold text-foreground">
              Số điện thoại:
            </span>{" "}
            {order?.phone}
          </p>

          <p>
            <span className="font-semibold text-foreground">
              Phương thức thanh toán:
            </span>{" "}
            {order?.payment}
          </p>
          <p>
            <span className="font-semibold text-foreground">Địa chỉ: </span>{" "}
            {order?.address}
          </p>
          <p>
            <span className="font-semibold text-foreground">Ghi chú: </span>{" "}
            {order?.userNote}
          </p>

          <p className="md:col-span-2">
            <span className="font-semibold text-foreground">Tổng tiền:</span>{" "}
            <span className="text-base text-destructive font-bold">
              {formatCurrency(calculateCartTotal(order?.cart || []))}
            </span>
          </p>
          <OrderPaid order={order as OrderResType} />
        </div>

        <div className="mt-8">
          <CartTable />
        </div>
      </section>
    </div>
  );
};

export default Page;

"use client";

import CartTable from "@/components/tables/CartTable";
import { useAppDispatch } from "@/store/store";
import { fetchOrder } from "@/store/thunk/fetch-order";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const Page = () => {
  const { id } = useParams();

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
      <CartTable />
    </div>
  );
};

export default Page;

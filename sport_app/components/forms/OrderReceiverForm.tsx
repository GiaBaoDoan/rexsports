"use client";

import { OrderReqType, OrderResType } from "@/types/order";
import { CiLocationOn, CiPhone, CiUser } from "react-icons/ci";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { Button } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { updateOrderStatus } from "@/store/thunk/update-order";
import { useParams } from "next/navigation";
import useAsyncAction from "@/hooks/useAsyncAction";
import { fetchOrder } from "@/store/thunk/fetch-order";
import { FaRegPenToSquare } from "react-icons/fa6";
import Image from "next/image";
import { MdAttachFile } from "react-icons/md";
import OrderPaid from "@/components/ui/order-paid";
import OrderUser from "@/components/ui/order-user";
import OrderShipping from "@/components/ui/order-shipping";

const userFields = [
  { icon: <CiUser strokeWidth={1} />, label: "Họ tên", name: "name" },
  { icon: <CiPhone strokeWidth={1} />, label: "Số điện thoại", name: "phone" },
  { icon: <CiLocationOn strokeWidth={1} />, label: "Địa chỉ", name: "address" },
  {
    icon: <FaRegPenToSquare className="text-sm" />,
    label: "Ghi chú",
    name: "userNote",
    typeInput: "text-area",
  },
];

const OrderReceiverForm = () => {
  const { order } = useAppSelector((state) => state.OrderReducer);
  const dispatch = useAppDispatch();

  const { execute, isLoading } = useAsyncAction();
  const { id } = useParams();

  const [isEdit, setIsEdit] = useState(false);

  const [data, setData] = useState<Partial<OrderReqType>>({
    name: "",
    phone: "",
    address: "",
    userNote: "",
  });

  const handelOnchange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    execute({
      actionCreator() {
        return updateOrderStatus({ id: `${id}`, data });
      },
      callBack() {
        return dispatch(fetchOrder(`${id}`));
      },
    });
  };

  useEffect(() => {
    setData({
      name: `${order?.name ?? ""}`,
      address: `${order?.address ?? ""}`,
      phone: `${order?.phone ?? ""}`,
      userNote: `${order?.userNote ?? ""}`,
    });
  }, [order]);

  return (
    <>
      <div className="my-5 bg-red-50 border border-red-100 p-3 rounded-lg">
        <div className="flex items-center justify-between mb-3">
          <h5 className="text-sm">Địa chỉ nhận hàng</h5>
          {!isEdit ? (
            <Button
              onClick={() => setIsEdit(true)}
              variant="outline"
              className="text-sm"
            >
              Sửa
            </Button>
          ) : (
            <div className="space-x-3">
              <Button
                onClick={() => setIsEdit(false)}
                variant="outline"
                className="text-sm"
              >
                Hủy
              </Button>
              <Button
                disabled={isLoading}
                onClick={handleUpdate}
                className="text-sm"
              >
                Cập nhật
              </Button>
            </div>
          )}
        </div>
        {userFields.map((field) => (
          <OrderUser
            key={field.name}
            icon={field.icon}
            label={field.label}
            isEdit={isEdit}
            name={field.name}
            value={data[field.name as keyof OrderReqType] as string}
            typeInput={field.typeInput as "text-area" | "input"}
            onChange={handelOnchange}
          />
        ))}
        {order?.bill && (
          <div className="flex gap-3 text-sm">
            <div className="flex gap-3 w-32">
              <MdAttachFile className="text-lg" />
              <p>Biên lai:</p>
            </div>
            <div>
              <Image
                src={`${order?.bill ?? ""}`}
                alt="Ảnh biên lai"
                width={200}
                height={200}
                className="object-cover rounded border mt-2"
              />
            </div>
          </div>
        )}
        <div className="flex items-center gap-3"></div>
      </div>
      <div className="flex gap-2 mb-2">
        <p className="font-bold text-sm">Tình trạng đơn: </p>
        <OrderShipping order={order as OrderResType} />
      </div>
      <div className="flex gap-2">
        <p className="font-bold text-sm start-4w-24">Thanh toán: </p>
        <OrderPaid order={order as OrderResType} />
      </div>
    </>
  );
};

export default OrderReceiverForm;

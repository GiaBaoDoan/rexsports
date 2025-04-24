"use client";

import { LookupForm } from "@/components/forms/LookupForm";
import CartItem from "@/components/pages/cart/CartItem";
import Loading from "@/components/ui/loading";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAppSelector } from "@/store/store";
import { TextSearch } from "lucide-react";
import Image from "next/image";

export function FindCart() {
  const { orders, isLoading } = useAppSelector((state) => state.OrdersReducer);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <TextSearch className="cursor-pointer" size={30} />
      </SheetTrigger>
      <SheetContent className="overflow-y-auto !max-w-[30rem] p-6 bg-white shadow-lg">
        <SheetHeader className="mb-5">
          <SheetTitle className="uppercase text-xl font-semibold text-gray-800">
            Tra cứu đơn hàng
          </SheetTitle>
        </SheetHeader>

        <div className="mb-6">
          <LookupForm />
        </div>

        <div className="space-y-4">
          {!isLoading ? (
            orders.length > 0 ? (
              orders.map((order, index) => (
                <CartItem key={index} order={order} />
              ))
            ) : (
              <div className="flex justify-center flex-col items-center my-10 gap-3">
                <Image
                  alt="Tra cứu đơn hàng"
                  width={100}
                  height={100}
                  src="https://food-order.vinhweb.com/illustrations/tra-cuu.svg"
                />
                <p className="text-center text-gray-600">
                  Nhập số điện thoại/email để kiểm tra tình trạng đơn hàng
                </p>
              </div>
            )
          ) : (
            <div className="flex justify-center items-center my-10">
              <Loading />
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}

"use client";

import { LookupForm } from "@/components/forms/LookupForm";
import CartItem from "@/components/pages/cart/CartItem";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAppSelector } from "@/store/store";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";

export function FindCart() {
  const { orders, isLoading } = useAppSelector((state) => state.OrdersReducer);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="secondary">
          <FaSearch />
        </Button>
      </SheetTrigger>
      <SheetContent className="overflow-y-auto !max-w-[30rem]">
        <SheetHeader>
          <SheetTitle className="uppercase">Tra cứu đơn hàng</SheetTitle>
        </SheetHeader>
        <LookupForm />
        <div className="space-y-3">
          {!isLoading ? (
            orders.map((order, index) => <CartItem key={index} order={order} />)
          ) : (
            <Loading />
          )}
        </div>
        {orders.length === 0 && (
          <div className="flex justify-center flex-col items-center my-10 gap-3">
            <Image
              alt="Tra cứu đơn hàng"
              width={100}
              height={100}
              src="https://food-order.vinhweb.com/illustrations/tra-cuu.svg"
            ></Image>
            <p className="text-center">
              Nhập số điện thoại/mã đơn để kiểm tra tình trạng đơn hàng
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}

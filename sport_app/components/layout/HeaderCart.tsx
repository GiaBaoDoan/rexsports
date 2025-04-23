"use client";

import { useAppSelector } from "@/store/store";
import Link from "next/link";
import { IoBagOutline } from "react-icons/io5";

const HeaderCart = () => {
  const { cart } = useAppSelector((state) => state.CartReducer);

  const AMOUNT_CART = cart.reduce(
    (accumulator, currentValue) => (accumulator += currentValue.quantity),
    0
  );

  return (
    <Link href="/carts">
      <div className="relative">
        <IoBagOutline size={30} className="text-gray-700" />
        <div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3">
          <span className="bg-red-500 text-[10px] text-white rounded-full w-5 h-5 flex items-center justify-center font-bold">
            {AMOUNT_CART || 0}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default HeaderCart;

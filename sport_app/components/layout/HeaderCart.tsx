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
    <Link href={"/carts"}>
      <div className="relative">
        <IoBagOutline size={30} />
        <div className="font-medium absolute top-1/2 -translate-y-1/3 left-1/2 -translate-x-1/2">
          <span className="bg-gray-500 text-[10px] text-white rounded-full w-3 h-3 inline-flex justify-center">
            {AMOUNT_CART || 0}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default HeaderCart;

"use client";

import { Button } from "@/components/ui/button";
import { useAppSelector } from "@/store/store";
import { formatCurrency } from "@/lib/format";
import { calculateCartTotal } from "@/lib/math";

import { useRouter } from "next/navigation";

export function FormCheckout() {
  const { cart } = useAppSelector((state) => state.CartReducer);

  const router = useRouter();

  return (
    <div className="flex flex-col items-end gap-5">
      <p>Thành tiền: {formatCurrency(calculateCartTotal(cart))}</p>
      <Button
        onClick={() => router.push("/checkout")}
        disabled={cart.length === 0}
      >
        Thanh toán
      </Button>
    </div>
  );
}

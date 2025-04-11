"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { addToCart, Cart } from "@/store/slice/cart";
import { useAppSelector } from "@/store/store";
import { ProductRes, VariantType } from "@/types/product";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { cn } from "@/lib/utils";

const ProductVariants = ({ product }: { product: ProductRes }) => {
  const dispatch = useDispatch();

  const { toast } = useToast();
  const [idActive, setIdActive] = useState<string>("");

  const onAddToCart = () => {
    const { variants, name, price } = product as ProductRes;
    const variant = variants.find((i) => i._id === idActive) as VariantType;

    const cart: Cart = {
      productId: `${product?._id}`,
      variantId: `${variant?._id}`,
      icon: variant.icon.url,
      color: variant.color,
      size: variant.size,
      name,
      price,
      quantity: 0,
    };

    dispatch(addToCart(cart));
    toast({
      description: "✅ Đã thêm sản phẩm vào giỏ hàng",
    });
  };

  const checkStock = () => {
    const isAvailable = product?.variants.filter((prd) => prd.stock > 0);
    return !Boolean(isAvailable?.length);
  };

  return (
    <div className="space-y-4">
      <h4 className="text-base font-medium">Phân loại</h4>

      <div className="grid grid-cols-3 md:flex md:flex-wrap gap-3">
        {product?.variants?.map((i) => (
          <div
            key={i._id}
            onClick={() => i.stock > 0 && setIdActive(i._id)}
            className={cn(
              "relative flex flex-col overflow-hidden items-center w-[120px] h-[120px] cursor-pointer border-[1px] rounded-md p-1",
              i.stock === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover:border-gray-400",
              i._id === idActive ? "border-black" : "border-gray-200"
            )}
          >
            <Image
              src={i.icon.url}
              width={300}
              height={300}
              className="w-full h-full object-cover rounded"
              alt="Phân loại sản phẩm"
            />
            <div className="absolute  bottom-0 text-[10px] bg-gray-700 text-white w-full px-1 py-[2px]">
              <span>
                {i.size} - {i.color} | Kho: {i.stock}
              </span>
            </div>
          </div>
        ))}
      </div>

      <Button
        disabled={checkStock() || !idActive}
        className={cn(
          "text-base p-3 rounded w-full",
          checkStock() || !idActive
            ? "bg-gray-300 text-gray-500"
            : "bg-black text-white"
        )}
        onClick={onAddToCart}
      >
        Thêm vào giỏ
      </Button>
    </div>
  );
};

export default ProductVariants;

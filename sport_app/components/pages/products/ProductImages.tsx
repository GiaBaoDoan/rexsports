"use client";

import Image from "next/image";
import { useAppSelector } from "@/store/store";

const ListImages = ({ width, height }: { height: number; width: number }) => {
  const { product } = useAppSelector((state) => state.ProductReducer);

  return (
    <div className="flex flex-col gap-3">
      {product?.images?.map((i) => (
        <Image
          src={i.url}
          key={i.publicId}
          alt="sản phẩm chi tiết"
          width={width}
          height={height}
        />
      ))}
    </div>
  );
};

const ProductImages = () => {
  return (
    <div className="grid-cols-4 grid gap-5 col-span-2">
      {/* large image */}
      <div>
        <div className="sticky top-28">
          {ListImages({
            height: 250,
            width: 250,
          })}
        </div>
      </div>

      {/* icon image */}
      <div className="col-span-3">
        {ListImages({
          height: 1000,
          width: 1000,
        })}
      </div>
    </div>
  );
};

export default ProductImages;

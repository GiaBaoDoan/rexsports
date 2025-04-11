"use client";

import Image from "next/image";
import { ProductRes } from "@/types/product";

const ProductImages = ({ product }: { product: ProductRes }) => {
  return (
    <div className="grid-cols-4 grid gap-5 col-span-2">
      {/* large image */}
      <div>
        <div className="sticky top-28">
          <div className="space-y-3">
            {product?.images?.map((i) => (
              <Image
                src={i.url}
                key={i.publicId}
                alt="sản phẩm chi tiết"
                width={150}
                height={150}
                className="w-[170px] h-[170px] object-cover"
              />
            ))}
          </div>
        </div>
      </div>

      {/* icon image */}
      <div className="col-span-3 space-y-3">
        {product?.images?.map((i) => (
          <Image
            src={i.url}
            key={i.publicId}
            alt="sản phẩm chi tiết"
            width={1000}
            height={1000}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductImages;

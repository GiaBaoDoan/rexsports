"use client";

import { formatCurrency } from "@/lib/format";
import { ProductRes } from "@/types/product";

const ProductInfor = ({ product }: { product: ProductRes }) => {
  const isFakePrice = product?.fakePrice !== 0;
  return (
    <div className="space-y-4">
      <article>
        <h2 className="text-2xl text-neutral-600 leading-relaxed">
          {product?.name}
        </h2>
      </article>

      <hr className="border-t border-gray-300" />

      <div className="flex items-center gap-3">
        <p className="text-lg font-semibold text-red-500">
          <span className="font-normal">Giá:</span>{" "}
          {formatCurrency(product?.price)}
        </p>
        {isFakePrice && (
          <span className="text-gray-500 text-sm line-through">
            {formatCurrency(product?.fakePrice)}
          </span>
        )}
      </div>

      {isFakePrice && (
        <div className="text-sm">
          <span className="text-gray-600">Tiết kiệm: </span>
          <span className="text-green-500 font-medium">
            {formatCurrency(
              Number(product?.fakePrice) - Number(product?.price)
            )}
          </span>
        </div>
      )}

      <hr className="border-t border-gray-300" />
    </div>
  );
};

export default ProductInfor;

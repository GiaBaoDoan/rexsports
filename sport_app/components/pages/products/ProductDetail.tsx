"use client";

import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchProduct } from "@/store/thunk/fetch-product";
import { useEffect } from "react";
import ProductVariants from "@/components/pages/products/ProductVariants";
import ProductInfor from "@/components/pages/products/ProductInfor";
import ProductImages from "@/components/pages/products/ProductImages";

const DetailProduct = () => {
  const dispatch = useAppDispatch();
  const { product } = useAppSelector((state) => state.ProductReducer);

  const { slug } = useParams();

  useEffect(() => {
    dispatch(fetchProduct(`${slug}`));
  }, [dispatch, slug]);

  return (
    <div className="grid grid-cols-3 gap-5 py-5 px-5">
      <ProductImages />
      <div className="space-y-5">
        <ProductInfor />
        <ProductVariants />
        <div
          className="font-light"
          dangerouslySetInnerHTML={{
            __html: `${product?.description}`,
          }}
        />
      </div>
    </div>
  );
};

export default DetailProduct;

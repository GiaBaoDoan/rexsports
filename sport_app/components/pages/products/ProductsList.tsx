"use client";

import { useAppDispatch, useAppSelector } from "@/store/store";
import ProductCard from "@/components/pages/products/ProductCard";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { fetchProductsThunk } from "@/store/thunk/fetch-products";

const ProductList = () => {
  const { products } = useAppSelector((state) => state.ProductsReducer);

  const queries = useSearchParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProductsThunk(`${queries}`));
  }, [queries, dispatch]);

  return (
    <div className="grid grid-cols-4 gap-y-5 mt-5">
      {products?.map((product) => {
        return <ProductCard key={product._id} product={product} />;
      })}
    </div>
  );
};

export default ProductList;

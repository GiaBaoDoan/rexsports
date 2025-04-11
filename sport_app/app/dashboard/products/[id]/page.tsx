"use client";

import ProductForm from "@/components/forms/ProductForm";
import useFetchData from "@/hooks/use-fetch-data";
import useAsyncAction from "@/hooks/useAsyncAction";
import { ProductType } from "@/schema/product";
import { useAppSelector } from "@/store/store";
import { fetchProduct } from "@/store/thunk/fetch-product";
import { updateProductThunk } from "@/store/thunk/update-product";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import slugify from "slugify";

const UpdateProductPage = () => {
  const { product } = useAppSelector((state) => state.ProductReducer);
  const { execute, isLoading } = useAsyncAction();
  const { id } = useParams();

  const handleUpdate = (product: ProductType) => {
    execute({
      actionCreator: () =>
        updateProductThunk({
          id: `${id}`,
          product: { ...product, slug: slugify(product.slug) },
        }),
    });
  };

  useFetchData(() => fetchProduct(`${id}`), [id]);

  const productData = useMemo<ProductType>(
    () => ({
      category: product?.category?._id ?? "",
      description: product?.description ?? "",
      name: product?.name ?? "",
      price: Number(product?.price) || 0,
      fakePrice: Number(product?.fakePrice) || 0,
      slug: product?.slug ?? "",
      status: `${product?.status}`,
      variants: product?.variants || [],
      images: product?.images || [],
    }),
    [product]
  );

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-5">📝 Sửa sản phẩm</h1>
      <ProductForm
        product={productData}
        isSubmiting={isLoading}
        onSubmit={handleUpdate}
      />
    </div>
  );
};

export default UpdateProductPage;

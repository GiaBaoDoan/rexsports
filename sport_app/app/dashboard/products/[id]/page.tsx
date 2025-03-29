"use client";

import ProductForm from "@/components/forms/ProductForm";
import useAsyncAction from "@/hooks/useAsyncAction";
import { ProductType } from "@/schema/product";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchProduct } from "@/store/thunk/fetch-product";
import { updateProductThunk } from "@/store/thunk/update-product";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import slugify from "slugify";

const UpdateProductPage = () => {
  const { product } = useAppSelector((state) => state.ProductReducer);
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const { execute, isLoading } = useAsyncAction();

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(`${id}`));
    }
  }, [id, dispatch]);

  const handleUpdate = (product: ProductType) => {
    execute({
      actionCreator: () =>
        updateProductThunk({
          id: `${id}`,
          product: { ...product, slug: slugify(product.slug) },
        }),
      callBack: () => dispatch(fetchProduct(`${id}`)),
    });
  };

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

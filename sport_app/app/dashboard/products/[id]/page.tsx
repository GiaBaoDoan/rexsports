"use client";

import ProductForm from "@/components/forms/ProductForm";
import Loading from "@/components/ui/loading";
import useFetchData from "@/hooks/use-fetch-data";
import useAsyncAction from "@/hooks/useAsyncAction";
import { ProductType } from "@/schema/product";
import { useAppSelector } from "@/store/store";
import { fetchProduct } from "@/store/thunk/fetch-product";
import { updateProductThunk } from "@/store/thunk/update-product";
import { ImageType, VariantType } from "@/types/product";
import { useParams } from "next/navigation";
import { useMemo } from "react";
import slugify from "slugify";

const UpdateProductPage = () => {
  const { product, isLoading } = useAppSelector(
    (state) => state.ProductReducer
  );
  const { execute, isLoading: isSubmiting } = useAsyncAction();
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
      category: product?.category?._id || "",
      description: product?.description || "",
      name: product?.name || "",
      price: product?.price || 0,
      fakePrice: product?.fakePrice || 0,
      slug: product?.slug || "",
      status: product?.status as boolean,
      images: product?.images as ImageType[],
      sold: product?.sold || 0,
      variants: product?.variants as VariantType[],
    }),
    [product]
  );

  if (isLoading) return <Loading />;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-5">📝 Sửa sản phẩm</h1>
      <ProductForm
        product={productData}
        isSubmiting={isSubmiting}
        onSubmit={handleUpdate}
      />
    </div>
  );
};

export default UpdateProductPage;

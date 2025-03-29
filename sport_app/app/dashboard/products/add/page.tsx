"use client";

import ProductForm from "@/components/forms/ProductForm";
import useAsyncAction from "@/hooks/useAsyncAction";
import { ProductType } from "@/schema/product";
import { createProductThunk } from "@/store/thunk/create-product";
import slugify from "slugify";

const CreateProductPage = () => {
  const { execute, isLoading } = useAsyncAction();

  const handleCreate = async (product: ProductType) => {
    execute({
      actionCreator: () =>
        createProductThunk({
          ...product,
          slug: slugify(product.name),
        }),
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-5">
        📝 Thêm sản phẩm
      </h1>
      <ProductForm onSubmit={handleCreate} isSubmiting={isLoading} />
    </div>
  );
};

export default CreateProductPage;

"use client";

import CategoryForm from "@/components/forms/CategoryForm";
import Loading from "@/components/ui/loading";
import useAsyncAction from "@/hooks/useAsyncAction";
import { CategorySchemaType } from "@/schema/category";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchCategory } from "@/store/thunk/fetch-category";
import { updateCategory } from "@/store/thunk/update-category";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";
import slugify from "slugify";

const UpdateCategoryPage = () => {
  const { category, isLoading } = useAppSelector(
    (state) => state.CategoryReducer
  );
  const dispatch = useAppDispatch();

  const { id } = useParams();

  const { execute, isLoading: isSubmiting } = useAsyncAction();

  const handleUpdate = (category: CategorySchemaType) => {
    execute({
      actionCreator: () =>
        updateCategory({
          id: `${id}`,
          category: { ...category, slug: slugify(category.slug) },
        }),
    });
  };

  const categoryData = useMemo<CategorySchemaType>(
    () => ({
      name: category?.name ?? "",
      slug: category?.slug ?? "",
    }),
    [category]
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchCategory(`${id}`));
    }
  }, [id, dispatch]);

  if (isLoading) return <Loading />;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-5">📝 Sửa danh mục</h1>
      <CategoryForm
        onSubmit={handleUpdate}
        isSubmiting={isSubmiting}
        category={categoryData}
      />
    </div>
  );
};

export default UpdateCategoryPage;

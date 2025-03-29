"use client";

import CategoryForm from "@/components/forms/CategoryForm";
import useAsyncAction from "@/hooks/useAsyncAction";
import { CategorySchemaType } from "@/schema/category";
import { createCategory } from "@/store/thunk/create-category";
import slugify from "slugify";

const CreateCategoryPage = () => {
  const { execute, isLoading } = useAsyncAction();

  const handleCreate = (category: CategorySchemaType) => {
    const newCategory = { ...category, slug: slugify(category.name) };

    execute({
      actionCreator: () => createCategory(newCategory),
    });
  };
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-5">
        📝 Thêm danh mục
      </h1>
      <CategoryForm onSubmit={handleCreate} isSubmiting={isLoading} />
    </div>
  );
};

export default CreateCategoryPage;

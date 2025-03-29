"use client";

import BannerForm from "@/components/forms/BannerForm";
import useAsyncAction from "@/hooks/useAsyncAction";
import { BannerRequestForm } from "@/schema/banner";
import { createBanner } from "@/store/thunk/create-banner";

const BannerAdd = () => {
  const { execute, isLoading } = useAsyncAction();
  const handleCreate = (data: BannerRequestForm) => {
    execute({
      actionCreator: () => createBanner(data),
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-5">
        📝 Thêm danh mục
      </h1>
      <BannerForm onSubmit={handleCreate} isSubmiting={isLoading} />
    </div>
  );
};

export default BannerAdd;

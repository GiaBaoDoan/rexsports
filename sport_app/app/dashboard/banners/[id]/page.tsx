"use client";

import BannerForm from "@/components/forms/BannerForm";
import useAsyncAction from "@/hooks/useAsyncAction";
import { BannerRequestForm } from "@/schema/banner";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchBannerById } from "@/store/thunk/fetch-bannerById";
import { updateBanner } from "@/store/thunk/update-banner";
import { useParams } from "next/navigation";
import { useEffect, useMemo } from "react";

const BannerUpdatePage = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  const { banner } = useAppSelector((state) => state.BannerByIdReducer);

  const { execute, isLoading } = useAsyncAction();

  const handleUpdate = (data: BannerRequestForm) => {
    execute({
      actionCreator: () => updateBanner({ id: `${id}`, data }),
    });
  };

  const data = useMemo(() => {
    return {
      description: banner?.description ?? "",
      image: banner?.image,
      link: banner?.link ?? "",
      title: banner?.title ?? "",
      status: banner?.status as boolean,
    };
  }, [banner]);

  useEffect(() => {
    dispatch(fetchBannerById(`${id}`));
  }, [id, dispatch]);

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-5">📝 Sửa danh mục</h1>
      <BannerForm
        onSubmit={handleUpdate}
        banner={data}
        isSubmiting={isLoading}
      />
    </div>
  );
};

export default BannerUpdatePage;

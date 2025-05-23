"use client";

import CollectionForm from "@/components/forms/CollectionForm";
import Loading from "@/components/ui/loading";
import useFetchData from "@/hooks/use-fetch-data";
import useAsyncAction from "@/hooks/useAsyncAction";
import { useAppSelector } from "@/store/store";
import { fetchCollectionById } from "@/store/thunk/fetch-collectionById";
import { updateCollection } from "@/store/thunk/update-collection";
import { CollectionReqType } from "@/types/collection";
import { ImageType, ProductRes } from "@/types/product";
import { useParams } from "next/navigation";
import { useMemo } from "react";

const UpdateCollectionPage = () => {
  const { id } = useParams();

  const { collection, isLoading } = useAppSelector(
    (state) => state.collectionByIdReducer
  );

  const { execute, isLoading: isSubmiting } = useAsyncAction();

  const handleUpdate = (data: CollectionReqType) => {
    const products = data.products as ProductRes[];
    data.products = products.map((prd) => prd._id);

    execute({
      actionCreator: () => updateCollection({ id: `${id}`, collection: data }),
    });
  };

  useFetchData(() => fetchCollectionById(id as string), [id as string]);

  const data = useMemo<CollectionReqType>(
    () => ({
      name: collection?.name ?? "",
      description: collection?.description ?? "",
      image: collection?.image as ImageType,
      products: collection?.products as ProductRes[],
      status: collection?.status as boolean,
      slug: collection?.slug || "",
    }),
    [collection]
  );

  if (isLoading) return <Loading />;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-5">
        📝 Sửa bộ sưu tập
      </h1>
      <CollectionForm
        isSubmiting={isSubmiting}
        collection={data}
        onSubmit={handleUpdate}
      />
    </div>
  );
};

export default UpdateCollectionPage;

"use client";

import CollectionForm from "@/components/forms/CollectionForm";
import useAsyncAction from "@/hooks/useAsyncAction";
import { createCollection } from "@/store/thunk/create-collection";
import { CollectionReqType } from "@/types/collection";
import { ProductRes } from "@/types/product";

const CreateCollectionPage = () => {
  const { execute, isLoading } = useAsyncAction();

  const handleCreate = (data: CollectionReqType) => {
    const products = data.products as ProductRes[];
    data.products = products.map((prd) => prd._id);

    execute({
      actionCreator: () => createCollection(data),
    });
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-5">
        📝 Thêm bộ sưu tập
      </h1>
      <CollectionForm isSubmiting={isLoading} onSubmit={handleCreate} />
    </div>
  );
};

export default CreateCollectionPage;

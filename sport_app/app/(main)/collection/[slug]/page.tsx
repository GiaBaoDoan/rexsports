"use client";

import ProductCard from "@/components/pages/products/ProductCard";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchCollectionById } from "@/store/thunk/fetch-collectionById";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const CollectionPage = () => {
  const { slug } = useParams();
  const { collection } = useAppSelector((state) => state.collectionByIdReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCollectionById(`${slug}`));
  }, [dispatch, slug]);
  return (
    <div className="max-w-6xl mx-auto my-16 px-4">
      {/* Tiêu đề Collection */}
      <article className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          {collection?.name}
        </h1>
        {collection?.description && (
          <p className="text-gray-600 text-sm md:text-base mt-2 max-w-xl">
            {collection.description}
          </p>
        )}
      </article>

      {/* Danh sách sản phẩm */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {collection?.products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CollectionPage;

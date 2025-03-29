import { ProductFilter } from "@/components/filters";
import ProductList from "@/components/pages/products/ProductsList";
import Loading from "@/components/ui/loading";
import { Suspense } from "react";

export default async function Products() {
  return (
    <div className="max-w-6xl mx-auto my-16 px-4 md:px-6">
      <article className="mb-8">
        <h1 className="font-semibold text-3xl text-gray-800">
          Tất cả sản phẩm
        </h1>
        <p className="text-gray-500 text-sm mt-2">
          Khám phá những sản phẩm mới nhất của chúng tôi
        </p>
      </article>
      <Suspense fallback={<Loading />}>
        <ProductFilter />
        <ProductList />
      </Suspense>
    </div>
  );
}

import { ProductFilter } from "@/components/filters";
import ProductList from "@/components/pages/products/ProductsList";
import Loading from "@/components/ui/loading";
import { API_URL } from "@/lib/contanst";
import { fetchData } from "@/lib/fetchDataServer";
import { ProductRes } from "@/types/product";
import { Suspense } from "react";

const getAllProducts = async (params?: {
  category?: string;
  sortByPrice?: string;
}) => {
  return await fetchData<ProductRes[]>(`/products`, params);
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { category: string; sortByPrice: string };
}) {
  const products = await getAllProducts(searchParams);

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
        <ProductList products={products as ProductRes[]} />
      </Suspense>
    </div>
  );
}

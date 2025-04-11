import ProductCard from "@/components/pages/products/ProductCard";
import { fetchData } from "@/lib/fetchDataServer";
import { CollectionResType } from "@/types/collection";

const getProductDetail = async (slug: string) => {
  return await fetchData<CollectionResType>(`collections/${slug}`);
};

export default async function CollectionPage({
  params,
}: {
  params: { slug: string };
}) {
  const collection = await getProductDetail(params.slug);
  return (
    <div className="max-w-6xl mx-auto my-16 px-4">
      <article className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          {collection?.name}
        </h1>
      </article>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {collection?.products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

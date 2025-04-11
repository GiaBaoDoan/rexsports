import DetailProduct from "@/components/pages/products/ProductDetail";
import { fetchData } from "@/lib/fetchDataServer";
import { ProductRes } from "@/types/product";

const getProductDetail = async (slug: string) => {
  return await fetchData<ProductRes>(`products/${slug}`);
};

export default async function Product({
  params,
}: {
  params: { slug: string };
}) {
  const product = (await getProductDetail(params.slug)) as ProductRes;

  return <DetailProduct product={product} />;
}

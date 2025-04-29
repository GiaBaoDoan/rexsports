import DetailProduct from "@/components/pages/products/ProductDetail";
import { fetchData } from "@/lib/fetchDataServer";
import { ProductRes } from "@/types/product";
import { notFound } from "next/navigation";

const getProductDetail = async (slug: string) => {
  try {
    const product = await fetchData<ProductRes>(`products/${slug}`);
    return product;
  } catch (err) {
    console.log(err);
  }
};

export default async function Product({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductDetail(params.slug);

  if (!product) {
    return notFound();
  }

  return <DetailProduct product={product as ProductRes} />;
}

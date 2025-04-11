import ProductVariants from "@/components/pages/products/ProductVariants";
import ProductInfor from "@/components/pages/products/ProductInfor";
import ProductImages from "@/components/pages/products/ProductImages";
import { ProductRes } from "@/types/product";

export default async function DetailProduct({
  product,
}: {
  product: ProductRes;
}) {
  return (
    <div className="grid grid-cols-3 gap-5 py-5 px-5">
      <ProductImages product={product} />
      <div className="space-y-5">
        <ProductInfor product={product} />
        <ProductVariants product={product} />
        <div
          className="font-light"
          dangerouslySetInnerHTML={{
            __html: `${product?.description}`,
          }}
        />
      </div>
    </div>
  );
}

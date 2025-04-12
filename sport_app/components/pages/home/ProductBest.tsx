import ProductCard from "@/components/pages/products/ProductCard";
import { Button } from "@/components/ui/button";
import { PATH } from "@/lib/contanst";
import { fetchData } from "@/lib/fetchDataServer";
import { ProductRes } from "@/types/product";
import Link from "next/link";

const getProductsBestSeller = async () => {
  return await fetchData<ProductRes[]>("/products");
};

const ProductBest = async () => {
  const products = await getProductsBestSeller();

  return (
    <div className="mx-auto max-w-6xl w-[90%] my-14">
      <article>
        <h1 className="underline text-3xl md:text-4xl font-bold mb-4 text-gray-800">
          BEST SELLER
        </h1>
        <p className="mb-6 text-gray-600 text-sm md:text-base font-light">
          Không chỉ là một giao dịch, mà là một trải nghiệm tuyệt vời
        </p>
      </article>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {products?.slice(0, 4).map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <div className="flex justify-center mt-10">
        <Link href={PATH.products.list}>
          <Button className="px-6 py-3 bg-gray-900 text-white hover:bg-gray-700 transition rounded-lg">
            Xem thêm
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProductBest;

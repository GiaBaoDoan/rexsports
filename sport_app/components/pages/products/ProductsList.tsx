import ProductCard from "@/components/pages/products/ProductCard";
import { ProductRes } from "@/types/product";

const ProductList = async ({ products }: { products: ProductRes[] }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-y-5 mt-5">
      {products?.map((product) => {
        return <ProductCard key={product._id} product={product} />;
      })}
    </div>
  );
};

export default ProductList;

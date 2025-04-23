import ProductCard from "@/components/pages/products/ProductCard";
import { ProductRes } from "@/types/product";

const ProductList = async ({ products }: { products: ProductRes[] }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-5">
      {products?.map(
        (product) =>
          product.status && <ProductCard key={product._id} product={product} />
      )}
    </div>
  );
};

export default ProductList;

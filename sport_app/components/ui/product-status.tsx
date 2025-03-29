import { ProductRes } from "@/types/product";

const ProductStatus = ({ data }: { data: ProductRes }) => {
  return (
    <span
      className={`hover:opacity-55 inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-white ${
        data.status ? "bg-blue-600" : "bg-red-600"
      } `}
    >
      {data.status ? "Công khai" : "Ngưng bán"}
    </span>
  );
};

export default ProductStatus;

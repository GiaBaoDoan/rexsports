"use client";

import Image from "next/image";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/format";
import { PATH } from "@/lib/contanst";
import useAsyncAction from "@/hooks/useAsyncAction";
import { deleteProductThunk } from "@/store/thunk/delete-product";
import { fetchProductsThunk } from "@/store/thunk/fetch-products";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { getDate } from "@/lib/date";
import { Tooltip } from "@/components/ui/tooltip";
import EditOrDelete from "@/components/ui/edit-delete";
import NoData from "@/components/ui/no-data";
import Loading from "@/components/ui/loading";
import Status from "@/components/ui/product-status";

const ProductsTable = () => {
  const { products, isLoading, isFetched } = useAppSelector(
    (state) => state.ProductsReducer
  );

  const { execute, isLoading: isSubmiting } = useAsyncAction();
  const dispatch = useAppDispatch();

  const handleDelete = (id: string) => {
    execute({
      actionCreator: () => deleteProductThunk(id),
      callBack: () => {
        dispatch(fetchProductsThunk(""));
      },
    });
  };

  if (isLoading && !isFetched) return <Loading />;
  return (
    <div className="mt-5 border rounded-lg p-2">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Ảnh</TableHead>
            <TableHead>Tên sản phẩm</TableHead>
            <TableHead>Cập nhật</TableHead>
            <TableHead>Giá</TableHead>
            <TableHead>Tình trạng</TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products?.map((product, index) => (
            <TableRow key={index}>
              <TableCell>
                <Image
                  src={product.images[0].url}
                  alt="ảnh"
                  width={300}
                  height={300}
                  className="w-[80px] h-[80px] object-cover"
                />
              </TableCell>
              <TableCell>
                <Tooltip>
                  <span className="block truncate w-[220px]">
                    {product.name}
                  </span>
                </Tooltip>
              </TableCell>
              <TableCell>{getDate(product.updatedAt)}</TableCell>
              <TableCell>{formatCurrency(product.price)}</TableCell>
              <TableCell>
                <Status status={product.status} />
              </TableCell>
              <TableCell className="flex h-[100px] justify-end items-center">
                <EditOrDelete
                  isLoading={isSubmiting}
                  path={PATH.products.edit(`${product._id}`)}
                  onDelete={() => handleDelete(product._id)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {!products.length && <NoData />}
    </div>
  );
};

export default ProductsTable;

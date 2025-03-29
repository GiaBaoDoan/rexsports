"use client";

import { useAppSelector } from "@/store/store";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/format";
import Image from "next/image";
import { calculateCartTotal } from "@/lib/math";
import { Cart } from "@/store/slice/cart";

const CartTable = () => {
  const { order } = useAppSelector((state) => state.OrderReducer);

  return (
    <Table>
      <TableCaption>Danh sách hóa đơn</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead colSpan={2} className=" text-black">
            Sản phẩm
          </TableHead>
          <TableHead className="w-[200px] text-black">Số lượng</TableHead>
          <TableHead className="w-[200px] text-right  text-black">
            Giá
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {order?.cart.map((i, index: number) => {
          return (
            <TableRow key={index}>
              <TableCell colSpan={2}>
                <div className="flex items-center gap-5">
                  <Image
                    width={100}
                    height={100}
                    src={i.icon}
                    alt="icon"
                    className="object-cover w-[80px] h-[80px]"
                  />
                  <div className="flex flex-col gap-2">
                    <p className="text-sm">
                      {i.name.length > 30
                        ? i.name.slice(0, 30) + "..."
                        : i.name}
                    </p>
                    <p>{formatCurrency(i.price)}</p>
                    <p className="text-sm">Màu : {i.color}</p>
                    <p>Size : {i.size}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex gap-3 w-[150px] rounded-lg items-center">
                  <span>{i.quantity}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                <span>{formatCurrency(i.price * i.quantity)}</span>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableRow>
          <TableCell colSpan={3}>Tổng</TableCell>
          <TableCell className="text-right">
            {formatCurrency(calculateCartTotal(order?.cart as Cart[]))}
          </TableCell>
        </TableRow>
      </TableFooter>
    </Table>
  );
};

export default CartTable;

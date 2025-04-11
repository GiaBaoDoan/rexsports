"use client";

import { useAppDispatch, useAppSelector } from "@/store/store";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/lib/format";
import Image from "next/image";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { FiTrash2 } from "react-icons/fi";
import { decreaseCart, increaseCart, removeCart } from "@/store/slice/cart";
import NoData from "@/components/ui/no-data";

const CartList = () => {
  const { cart } = useAppSelector((state) => state.CartReducer);
  const dispatch = useAppDispatch();

  if (cart.length === 0) return <NoData />;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="font-bold text-black">Sản phẩm</TableHead>
          <TableHead className="w-[180px] text-center font-bold text-black">
            Số lượng
          </TableHead>
          <TableHead className="w-[180px] text-right font-bold text-black">
            Tổng giá
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cart.map((i) => {
          const id = i.variantId;
          return (
            <TableRow key={id}>
              {/* Cột sản phẩm */}
              <TableCell>
                <div className="flex items-center gap-4">
                  <Image
                    width={300}
                    height={300}
                    src={i.icon}
                    className="w-[70px] h-[70px] rounded-md object-cover"
                    alt="icon"
                  />
                  <div className="flex flex-col text-sm max-w-[300px] gap-1">
                    <p className="font-medium line-clamp-2">{i.name}</p>
                    <p className="text-gray-700">{formatCurrency(i.price)}</p>
                    <p className="text-xs text-gray-500">Màu: {i.color}</p>
                    <p className="text-xs text-gray-500">Size: {i.size}</p>
                  </div>
                </div>
              </TableCell>

              {/* Cột số lượng */}
              <TableCell className="text-center">
                <div className="flex items-center justify-center gap-2">
                  <Button
                    onClick={() => dispatch(decreaseCart(id))}
                    variant="ghost"
                    size="sm"
                  >
                    <FaMinus />
                  </Button>
                  <span>{i.quantity}</span>
                  <Button
                    onClick={() => dispatch(increaseCart(id))}
                    variant="ghost"
                    size="sm"
                  >
                    <FaPlus />
                  </Button>
                  <Button
                    variant="ghost"
                    onClick={() => dispatch(removeCart(id))}
                  >
                    <FiTrash2 size={18} />
                  </Button>
                </div>
              </TableCell>

              {/* Cột tổng giá */}
              <TableCell className="text-right font-medium">
                {formatCurrency(i.price * i.quantity)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
export default CartList;

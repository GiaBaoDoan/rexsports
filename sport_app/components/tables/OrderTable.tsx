"use client";

import { Badge } from "@/components/ui/badge";
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
import { calculateCartTotal } from "@/lib/math";
import { getDate } from "@/lib/date";
import useAsyncAction from "@/hooks/useAsyncAction";
import { deleteOrderThunk } from "@/store/thunk/delete-order";
import { fetchOrders } from "@/store/thunk/fetch-orders";
import { useAppDispatch } from "@/store/store";
import OrderPaid from "@/components/ui/order-paid";
import EditOrDelete from "@/components/ui/edit-delete";
import OrderShipping from "@/components/ui/order-shipping";
import NoData from "@/components/ui/no-data";
import { OrderResType } from "@/types/order";

const OrdersTable = ({ orders }: { orders: OrderResType[] | [] }) => {
  const dispatch = useAppDispatch();

  const { execute, isLoading } = useAsyncAction();

  const handleDelete = (id: string) => {
    execute({
      actionCreator: () => deleteOrderThunk(id),
      callBack: () => dispatch(fetchOrders("")),
    });
  };

  return (
    <div className="border p-2 rounded-lg">
      <Table>
        {/* header */}
        <TableHeader>
          <TableRow>
            <TableHead>Mã đơn hàng</TableHead>
            <TableHead>Người đặt</TableHead>
            <TableHead>Ngày đặt</TableHead>
            <TableHead>Thanh toán</TableHead>
            <TableHead>Tổng tiền</TableHead>
            <TableHead>Trạng thái</TableHead>
            <TableHead className="text-right">Thao tác</TableHead>
          </TableRow>
        </TableHeader>
        {/* body render orders */}
        <TableBody>
          {orders?.map((order, index) => {
            return (
              <TableRow key={index}>
                <TableCell>
                  <Badge variant="secondary">{order._id?.slice(3, 10)}</Badge>
                </TableCell>
                <TableCell>
                  <p>{order.name}</p>
                  <p className="text-xs text-slate-600">{order.phone}</p>
                </TableCell>
                <TableCell>{getDate(`${order.createdAt}`)}</TableCell>
                <TableCell>
                  <OrderPaid key={order._id} order={order} />
                </TableCell>
                <TableCell>
                  {formatCurrency(calculateCartTotal(order.cart))}
                </TableCell>
                <TableCell>
                  <OrderShipping order={order} />
                </TableCell>
                {/* actions */}
                <TableCell className="flex h-[100px] justify-end items-center">
                  <EditOrDelete
                    isLoading={isLoading}
                    path={PATH.orders.edit(`${order._id}`)}
                    onDelete={() => handleDelete(order._id)}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      {orders?.length === 0 && <NoData />}
    </div>
  );
};

export default OrdersTable;

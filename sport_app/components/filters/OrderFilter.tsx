"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDebouncedValue } from "@/hooks/use-debounce";
import { useQueryParams } from "@/hooks/use-params";
import { filterByPhoneNumber } from "@/store/slice/orders";
import { useAppDispatch } from "@/store/store";
import { useEffect, useState } from "react";

const OrderFilter = () => {
  const dispatch = useAppDispatch();

  const [phone, setPhone] = useState("");
  const debounced = useDebouncedValue(phone, 500);

  const { updateQuery } = useQueryParams();

  useEffect(() => {
    dispatch(filterByPhoneNumber(debounced));
  }, [debounced, dispatch]);

  return (
    <div className="my-5 grid grid-cols-4 gap-3">
      {/* filter by phone number */}
      <Input
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
        placeholder="Lọc số điện thoại..."
      ></Input>
      {/* filter by phone number */}
      <Input
        onChange={(e) => setPhone(e.target.value)}
        value={phone}
        placeholder="Lọc số điện thoại..."
      ></Input>

      {/* filter by status */}
      <Select onValueChange={(shipping) => updateQuery("shipping", shipping)}>
        <SelectTrigger>
          <SelectValue placeholder="Tình trạng đơn" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="null">Tất cả</SelectItem>
          <SelectItem value="Pending">Đơn mới</SelectItem>
          <SelectItem value="Confirmed">Đã xác nhận</SelectItem>
          <SelectItem value="Shipped">Đang giao</SelectItem>
          <SelectItem value="Delivered">Đã giao</SelectItem>
          <SelectItem value="Cancelled">Đã hủy bỏ</SelectItem>
        </SelectContent>
      </Select>
      {/* filter by isPaid */}
      <Select onValueChange={(isPaid) => updateQuery("isPaid", isPaid)}>
        <SelectTrigger>
          <SelectValue placeholder="Thanh toán" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="null">Tất cả</SelectItem>
          <SelectItem value="false">Chưa Thanh toán</SelectItem>
          <SelectItem value="true">Đã thanh toán</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default OrderFilter;

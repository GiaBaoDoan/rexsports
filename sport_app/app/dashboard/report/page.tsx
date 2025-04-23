"use client";

import OrdersTable from "@/components/tables/OrderTable";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { DatePickerWithRange } from "@/components/ui/date-picker";
import { formatCurrency } from "@/lib/format";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { getReport } from "@/store/thunk/get-report";
import { OrderResType } from "@/types/order";
import { Users, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";
import { useEffect } from "react";

export default function ReportDashboard() {
  const dispatch = useAppDispatch();

  const { report } = useAppSelector((state) => state.ReportReducer);

  useEffect(() => {
    dispatch(getReport(""));
  }, [dispatch]);

  return (
    <div className="space-y-6">
      <h1 className="font-bold text-2xl">Báo cáo</h1>
      <DatePickerWithRange />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Người dùng</span>
              <Users className="w-5 h-5 text-gray-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{report?.totalUsers || 0}</p>
            <p className="text-xs text-muted-foreground">
              {report?.usersToday || 0} người dùng mới
            </p>
          </CardContent>
        </Card>

        {/* Đơn hàng */}
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Đơn hàng</span>
              <ShoppingCart className="w-5 h-5 text-gray-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{report?.totalOrders || 0}</p>
            <p className="text-xs text-muted-foreground">
              {report?.pendingOrders || 0} đơn cần xử lý
            </p>
          </CardContent>
        </Card>

        {/* Doanh thu */}
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Doanh thu</span>
              <DollarSign className="w-5 h-5 text-gray-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {formatCurrency(report?.totalRevenue || 0)}
            </p>
            <p className="text-xs text-muted-foreground">
              Hôm nay: {formatCurrency(report?.revenueToday || 0)}
            </p>
          </CardContent>
        </Card>

        {/* Trung bình đơn hàng */}
        <Card>
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span>Giá trị đơn TB</span>
              <TrendingUp className="w-5 h-5 text-gray-500" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {formatCurrency(report?.avgOrderValue || 0)}
            </p>
            <p className="text-xs text-muted-foreground">
              + 10% so với hôm qua
            </p>
          </CardContent>
        </Card>
      </div>
      <OrdersTable orders={report?.orders as OrderResType[]} />
    </div>
  );
}

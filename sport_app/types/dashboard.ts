import { OrderResType } from "@/types/order";
import { ProductRes } from "@/types/product";

export interface RevenueRes {
  today: {
    revenue: number;
    orders: number;
  };
  week: {
    revenue: number;
    orders: number;
  };
  month: {
    revenue: number;
    orders: number;
  };
}

export interface ReportRes {
  orders: OrderResType[] | [];
  totalUsers: number;
  usersToday: number;
  totalOrders: number;
  totalRevenue: number;
  avgOrderValue: number;
  ordersToday: number;
  revenueToday: number;
  pendingOrders: number;
  topSellingProducts: ProductRes[];
}

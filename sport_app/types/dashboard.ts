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

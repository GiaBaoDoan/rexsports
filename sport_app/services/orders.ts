import { OrderResType, OrderReqType } from "@/types/order";
import { ApiResponse } from "@/types/types";
import { OrderType } from "@/store/thunk/create-order";
import AxiosIntance from "@/lib/configAxios";

export interface DataType {
  id: string;
  data: Partial<OrderReqType>;
}

export const OrderServices = {
  createOrder: (data: OrderType) =>
    AxiosIntance.post<ApiResponse<OrderResType>>("/orders", data),
  fetchOrders: (params: string) =>
    AxiosIntance.get<ApiResponse<OrderResType[]>>(`/orders?${params}`),
  fetchOrder: (id: string) =>
    AxiosIntance.get<ApiResponse<OrderResType>>(`/orders/${id}`),
  deleteOrder: (id: string) =>
    AxiosIntance.delete<ApiResponse<OrderResType>>(`/orders/${id}`),
  updateOrderStatus: (data: DataType) =>
    AxiosIntance.put<ApiResponse<OrderResType>>(
      `/orders/${data.id}`,
      data.data
    ),
  confirmOrder: (orderId: string) =>
    AxiosIntance.post<ApiResponse<OrderResType>>(
      `/orders/send-email/${orderId}`
    ),
};

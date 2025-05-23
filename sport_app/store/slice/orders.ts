import { removeVietnameseTones } from "@/lib/string";
import { fetchOrders } from "@/store/thunk/fetch-orders";
import { OrderResType } from "@/types/order";
import { ApiError, PaginationRes } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

type initialState = {
  orders: OrderResType[];
  original: OrderResType[];
  isLoading: boolean;
  error: AxiosError<ApiError> | null;
  pagination: PaginationRes | null;
};

const initialState: initialState = {
  orders: [],
  original: [],
  isLoading: false,
  pagination: null,
  error: null,
};

const OrderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    filterByPhoneNumber: (state, action: PayloadAction<string>) => {
      const key = action.payload;
      state.orders = state.original.filter((order) =>
        removeVietnameseTones(order.phone).includes(removeVietnameseTones(key))
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      state.orders = state.original = action.payload.data;
      state.pagination = action.payload.pagination as PaginationRes;
      state.isLoading = false;
    });
    builder.addCase(fetchOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as AxiosError<ApiError>;
    });
  },
});

export const { filterByPhoneNumber } = OrderSlice.actions;

export default OrderSlice.reducer;

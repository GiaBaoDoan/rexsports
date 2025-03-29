import { removeVietnameseTones } from "@/lib/string";
import { fetchOrders } from "@/store/thunk/fetch-orders";
import { OrderResType } from "@/types/order";
import { ApiError, PaginationRes } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

type initialState = {
  orders: OrderResType[] | [];
  original: OrderResType[] | [];
  isLoading: boolean;
  error: AxiosError<ApiError> | null;
  pagination: PaginationRes;
  isFetched: boolean;
};

const initialState: initialState = {
  orders: [],
  original: [],
  isLoading: false,
  isFetched: false,
  pagination: {
    currentPage: 1,
    limit: 5,
    totalPages: 0,
    totalRecords: 0,
  },
  error: null,
};

const OrderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    filterByPhoneNumber: (state, action: PayloadAction<string>) => {
      const key = action.payload as string;
      state.orders = state.original.filter((order) =>
        removeVietnameseTones(order.phone).includes(removeVietnameseTones(key))
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchOrders.fulfilled, (state, action) => {
      const { data, pagination } = action.payload;
      state.orders = state.original = data as OrderResType[];
      state.pagination = pagination as PaginationRes;
      state.isLoading = false;
      state.error = null;
      state.isFetched = true;
    });
    builder.addCase(fetchOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOrders.rejected, (state, action) => {
      state.orders = [];
      state.isLoading = false;
      state.error = action.payload as AxiosError<ApiError>;
      state.isFetched = false;
    });
  },
});

export const { filterByPhoneNumber } = OrderSlice.actions;

export default OrderSlice.reducer;

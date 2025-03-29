import { fetchOrder } from "@/store/thunk/fetch-order";
import { OrderResType } from "@/types/order";
import { ApiError } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

type initialState = {
  order: OrderResType | null;
  isLoading: boolean;
  error: AxiosError<ApiError> | null;
};

const initialState: initialState = {
  order: null,
  isLoading: false,
  error: null,
};

const orderDetailSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchOrder.fulfilled, (state, action) => {
      state.order = action.payload?.data as OrderResType;
      state.isLoading = false;
    });
    builder.addCase(fetchOrder.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchOrder.rejected, (state, action) => {
      state.order = null;
      state.isLoading = false;
      state.error = action.payload as AxiosError<ApiError>;
    });
  },
});

export default orderDetailSlice.reducer;

import { fetchProduct } from "@/store/thunk/fetch-product";
import { ProductRes } from "@/types/product";
import { ApiError } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

type initialState = {
  product: ProductRes | null;
  isLoading: boolean;
  error: AxiosError<ApiError> | null;
};

const initialState: initialState = {
  product: null,
  isLoading: false,
  error: null,
};

const productDetailSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.product = action.payload.data;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(fetchProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as AxiosError<ApiError>;
    });
  },
});

export default productDetailSlice.reducer;

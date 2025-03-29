import { fetchProduct } from "@/store/thunk/fetch-product";
import { ProductRes } from "@/types/product";
import { ApiError } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

type initialState = {
  product: ProductRes | null;
  isLoading: boolean;
  isFetched: boolean;
  error: AxiosError<ApiError> | null;
};

const initialState: initialState = {
  product: null,
  isLoading: false,
  error: null,
  isFetched: false,
};

const productDetailSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action) => {
      return { ...state, product: action.payload };
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchProduct.fulfilled, (state, action) => {
      state.product = action.payload.data as ProductRes;
      state.isLoading = false;
      state.error = null;
      state.isFetched = true;
    });
    builder.addCase(fetchProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProduct.rejected, (state, action) => {
      state.product = null;
      state.isLoading = false;
      state.error = action.payload as AxiosError<ApiError>;
    });
  },
});

export const { setProduct } = productDetailSlice.actions;

export default productDetailSlice.reducer;

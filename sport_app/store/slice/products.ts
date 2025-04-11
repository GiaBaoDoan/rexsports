import { removeVietnameseTones } from "@/lib/string";
import { fetchProductsThunk } from "@/store/thunk/fetch-products";
import { ProductRes } from "@/types/product";
import { ApiError, PaginationRes } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

type initialState = {
  products: ProductRes[];
  original: ProductRes[];
  pagination: PaginationRes | null;
  isLoading: boolean;
  error: AxiosError<ApiError> | null;
};

const initialState: initialState = {
  products: [],
  original: [],
  isLoading: false,
  error: null,
  pagination: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    filterByName: (state, action: PayloadAction<string>) => {
      const keyword = action.payload;
      state.products = state.original.filter((product) =>
        removeVietnameseTones(product.name).includes(
          removeVietnameseTones(keyword)
        )
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchProductsThunk.fulfilled, (state, action) => {
      state.products = state.original = action.payload.data;
      state.pagination = action.payload.pagination as PaginationRes;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(fetchProductsThunk.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProductsThunk.rejected, (state, action) => {
      state.products = state.original = [];
      state.error = action.payload as AxiosError<ApiError>;
      state.isLoading = false;
    });
  },
});

export const { filterByName } = productsSlice.actions;
export default productsSlice.reducer;

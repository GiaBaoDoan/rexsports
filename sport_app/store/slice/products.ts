import { removeVietnameseTones } from "@/lib/string";
import { fetchProductsThunk } from "@/store/thunk/fetch-products";
import { ProductRes } from "@/types/product";
import { ApiError, PaginationRes } from "@/types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

type initialState = {
  products: ProductRes[];
  original: ProductRes[];
  isLoading: boolean;
  error: AxiosError<ApiError> | null;
  isFetched: boolean;
  pagination: PaginationRes;
};

const initialState: initialState = {
  products: [],
  original: [],
  isLoading: false,
  error: null,
  isFetched: false,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
    limit: 5,
  },
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
      const { data, pagination } = action.payload;
      state.products = state.original = data as ProductRes[];
      state.pagination = pagination as PaginationRes;
      state.isLoading = false;
      state.error = null;
      state.isFetched = true;
    });
    builder.addCase(fetchProductsThunk.pending, (state, _) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProductsThunk.rejected, (state, action) => {
      state.products = state.original = [];
      state.error = action.payload as AxiosError<ApiError>;
      state.isLoading = false;
      state.isFetched = false;
    });
  },
});

export const { filterByName } = productsSlice.actions;
export default productsSlice.reducer;

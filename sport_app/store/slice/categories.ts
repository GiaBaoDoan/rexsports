import { removeVietnameseTones } from "@/lib/string";
import { fetchCategories } from "@/store/thunk/fetch-categories";
import { CategoriesRes } from "@/types/category";
import { ApiError, PaginationRes } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

type initialState = {
  original: CategoriesRes[];
  categories: CategoriesRes[];
  isLoading: boolean;
  isFetched: boolean;
  pagination: PaginationRes;
  error: AxiosError<ApiError> | null;
};

const initialState: initialState = {
  original: [],
  categories: [],
  isLoading: false,
  isFetched: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalRecords: 0,
    limit: 5,
  },
};

const CategoriesSlice = createSlice({
  name: "Categories",
  initialState,
  reducers: {
    filterByName: (state, action) => {
      const key = action.payload.toLowerCase();
      state.categories = state.original.filter((cat) =>
        removeVietnameseTones(cat.name)
          .toLowerCase()
          .includes(removeVietnameseTones(key))
      );
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCategories.fulfilled, (state, { payload }) => {
      const { data } = payload;
      state.original = state.categories = data as CategoriesRes[];
      state.pagination = payload.pagination as PaginationRes;
      state.isLoading = false;
      state.error = null;
      state.isFetched = true;
    });
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.categories = state.original = [];
      state.error = action.payload as AxiosError<ApiError>;
      state.isFetched = false;
    });
  },
});

export const { filterByName } = CategoriesSlice.actions;

export default CategoriesSlice.reducer;

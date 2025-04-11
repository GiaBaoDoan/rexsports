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
  pagination: PaginationRes | null;
  error: AxiosError<ApiError> | null;
};

const initialState: initialState = {
  original: [],
  categories: [],
  isLoading: false,
  error: null,
  pagination: null,
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
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.original = state.categories = action.payload.data;
      state.pagination = action.payload.pagination as PaginationRes;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(fetchCategories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCategories.rejected, (state, action) => {
      state.isLoading = false;
      state.categories = state.original = [];
      state.error = action.payload as AxiosError<ApiError>;
    });
  },
});

export const { filterByName } = CategoriesSlice.actions;

export default CategoriesSlice.reducer;

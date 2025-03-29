import { fetchCategory } from "@/store/thunk/fetch-category";
import { CategoriesRes } from "@/types/category";
import { ApiError } from "@/types/types";
import { createSlice } from "@reduxjs/toolkit";
import { AxiosError } from "axios";

type initialState = {
  category: CategoriesRes | null;
  isLoading: boolean;
  error?: AxiosError<ApiError> | null;
};

const initialState: initialState = {
  category: null,
  isLoading: false,
  error: null,
};

const CategorySlice = createSlice({
  name: "Category",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchCategory.fulfilled, (state, action) => {
      state.category = action.payload.data as CategoriesRes;
      state.isLoading = false;
      state.error = null;
    });
    builder.addCase(fetchCategory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchCategory.rejected, (state, action) => {
      state.category = null;
      state.isLoading = false;
      state.error = action.payload as AxiosError<ApiError>;
    });
  },
});

export default CategorySlice.reducer;

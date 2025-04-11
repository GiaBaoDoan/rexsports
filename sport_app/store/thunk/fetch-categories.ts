import { CategoriesService } from "@/services/categories";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk(
  "/fetch-categories",
  async (_, { rejectWithValue }) => {
    try {
      const res = await CategoriesService.fetchCategories();
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

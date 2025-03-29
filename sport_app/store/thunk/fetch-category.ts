import { CategoriesService } from "@/services/categories";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategory = createAsyncThunk(
  "/fetch-category",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await CategoriesService.fetchCategory(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

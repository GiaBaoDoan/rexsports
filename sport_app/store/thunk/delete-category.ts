import { CategoriesService } from "@/services/client-side/categories";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteCategory = createAsyncThunk(
  "/delete-category",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await CategoriesService.deleteCategory(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

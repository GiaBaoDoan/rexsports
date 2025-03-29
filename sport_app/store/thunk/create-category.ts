import { CategorySchemaType } from "@/schema/category";
import { CategoriesService } from "@/services/client-side/categories";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createCategory = createAsyncThunk(
  "/create-category",
  async (data: CategorySchemaType, { rejectWithValue }) => {
    try {
      const res = await CategoriesService.createCategory(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

import { CategorySchemaType } from "@/schema/category";
import { CategoriesService } from "@/services/client-side/categories";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface DataType {
  id: string;
  category: CategorySchemaType;
}

export const updateCategory = createAsyncThunk(
  "/update-category",
  async ({ id, category }: DataType, { rejectWithValue }) => {
    try {
      const res = await CategoriesService.updateCategory(id, category);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

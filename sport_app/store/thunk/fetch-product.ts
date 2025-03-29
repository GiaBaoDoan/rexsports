import { ProductServices } from "@/services/client-side/products";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProduct = createAsyncThunk(
  "/product/:id",
  async (slug: string, { rejectWithValue }) => {
    try {
      const res = await ProductServices.fetchProduct(slug);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

import { ProductServices } from "@/services/products";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProductsThunk = createAsyncThunk(
  "/fetch-products",
  async (params: string, { rejectWithValue }) => {
    try {
      const res = await ProductServices.fetchProducts(params);
      return res.data;
    } catch (err: any) {
      return rejectWithValue(err);
    }
  }
);

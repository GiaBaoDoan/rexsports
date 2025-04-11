import { ProductServices } from "@/services/products";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteProductThunk = createAsyncThunk(
  "/delete-product",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await ProductServices.deleteProduct(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

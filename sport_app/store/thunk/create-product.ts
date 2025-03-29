import { ProductType } from "@/schema/product";
import { ProductServices } from "@/services/products";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createProductThunk = createAsyncThunk(
  "/create-product",
  async (data: ProductType, { rejectWithValue }) => {
    try {
      const res = await ProductServices.createProduct(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

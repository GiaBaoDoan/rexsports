import { ProductType } from "@/schema/product";
import { ProductServices } from "@/services/products";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface DataType {
  id: string;
  product: ProductType;
}

export const updateProductThunk = createAsyncThunk(
  "/update-product",
  async ({ id, product }: DataType, { rejectWithValue }) => {
    try {
      const res = await ProductServices.updateProduct(id, product);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

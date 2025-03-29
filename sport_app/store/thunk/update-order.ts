import { DataType, OrderServices } from "@/services/orders";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const updateOrderStatus = createAsyncThunk(
  "/update-order",
  async ({ id, data }: DataType, { rejectWithValue }) => {
    try {
      const res = await OrderServices.updateOrderStatus({ id, data });
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

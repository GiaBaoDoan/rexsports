import { OrderServices } from "@/services/orders";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchOrder = createAsyncThunk(
  "/fetch-order",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await OrderServices.fetchOrder(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

import { OrderServices } from "@/services/orders";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchOrders = createAsyncThunk(
  "/fetch-orders",
  async (params: string = "", { rejectWithValue }) => {
    try {
      const res = await OrderServices.fetchOrders(params);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

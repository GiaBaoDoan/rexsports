import { OrderServices } from "@/services/orders";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const confirmOrder = createAsyncThunk(
  "/confirm-order",
  async (orderId: string, { rejectWithValue }) => {
    try {
      const res = await OrderServices.confirmOrder(orderId);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

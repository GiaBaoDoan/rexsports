import { OrderServices } from "@/services/orders";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const deleteOrderThunk = createAsyncThunk(
  "/delete-order",
  async (id: string, { rejectWithValue }) => {
    try {
      const res = await OrderServices.deleteOrder(id);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

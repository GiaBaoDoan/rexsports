import { AdminSeverice } from "@/services/dashboard";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchRevenue = createAsyncThunk(
  "/fetch-revenue",
  async (_, { rejectWithValue }) => {
    try {
      const res = await AdminSeverice.fetchRevenue();
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

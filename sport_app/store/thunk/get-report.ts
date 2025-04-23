import { AdminSeverice } from "@/services/dashboard";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getReport = createAsyncThunk(
  "/get-report",
  async (params: string, { rejectWithValue }) => {
    try {
      const res = await AdminSeverice.getReport(params);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

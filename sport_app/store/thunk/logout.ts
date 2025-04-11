import { AuthServices } from "@/services/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const LogoutThunk = createAsyncThunk(
  "/logout",
  async (_, { rejectWithValue }) => {
    try {
      const res = await AuthServices.logout();
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

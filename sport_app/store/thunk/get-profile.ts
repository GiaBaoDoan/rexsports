import { AuthServices } from "@/services/client-side/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getProfileThunk = createAsyncThunk(
  "/get-profile",
  async (_, { rejectWithValue }) => {
    try {
      const res = await AuthServices.getMe();
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

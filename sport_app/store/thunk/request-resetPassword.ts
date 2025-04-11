import { AuthServices } from "@/services/client-side/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const requestResetPasswordThunk = createAsyncThunk(
  "/request-reset-password",
  async (email: string, { rejectWithValue }) => {
    try {
      const res = await AuthServices.requestResetPassword(email);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

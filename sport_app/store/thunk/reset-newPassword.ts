import { AuthServices } from "@/services/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";

type DataType = {
  userId: string;
  password: string;
  token: string;
};

export const resetNewPassword = createAsyncThunk(
  "/reset-new-password",
  async ({ userId, token, password }: DataType, { rejectWithValue }) => {
    try {
      const res = await AuthServices.resetNewPassword(userId, token, password);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

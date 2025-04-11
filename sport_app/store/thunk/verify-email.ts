import { AuthServices } from "@/services/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";

type DataType = {
  id: string;
  token: string;
};

export const VerifyEmailThunk = createAsyncThunk(
  "/verify-email",
  async ({ id, token }: DataType, { rejectWithValue }) => {
    try {
      const res = await AuthServices.verifyEmail(id, token);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

import { loginType } from "@/components/forms/LoginForm";
import { AuthServices } from "@/services/client-side/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const LoginThunk = createAsyncThunk(
  "/login",
  async (data: loginType, { rejectWithValue }) => {
    try {
      const res = await AuthServices.login(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

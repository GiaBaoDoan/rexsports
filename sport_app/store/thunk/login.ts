import { LoginSchemaType } from "@/schema/login";
import { AuthServices } from "@/services/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const LoginThunk = createAsyncThunk(
  "/login",
  async (data: LoginSchemaType, { rejectWithValue }) => {
    try {
      const res = await AuthServices.login(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

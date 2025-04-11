import { AuthServices } from "@/services/client-side/auth";
import { createAsyncThunk } from "@reduxjs/toolkit";

export type signupType = {
  email: string;
  name: string;
  password: string;
};

export const SignupThunk = createAsyncThunk(
  "/signup",
  async (data: signupType, { rejectWithValue }) => {
    try {
      const res = await AuthServices.signUp(data);
      return res.data;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);
